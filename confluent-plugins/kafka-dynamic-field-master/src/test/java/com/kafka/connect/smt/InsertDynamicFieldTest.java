package com.kafka.connect.smt;

import org.apache.kafka.connect.data.Schema;
import org.apache.kafka.connect.data.SchemaBuilder;
import org.apache.kafka.connect.data.Struct;
import org.apache.kafka.connect.errors.DataException;
import org.apache.kafka.connect.source.SourceRecord;
import org.junit.After;
import org.junit.Test;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.junit.Assert.*;

public class InsertDynamicFieldTest {

  private InsertDynamicField<SourceRecord> xform = new InsertDynamicField.Value<>();

  @After
  public void tearDown() throws Exception {
    xform.close();
  }

  @Test(expected = DataException.class)
  public void topLevelStructRequired() {
    final Map<String, Object> newRecord = new HashMap<>();

    newRecord.put("tweetType", "INITIAL");
    newRecord.put("userID", UUID.randomUUID().toString());

    xform.configure(newRecord);
    xform.apply(new SourceRecord(null, null, "", 0, Schema.STRING_SCHEMA, 42));
  }

  @Test
  public void copySchemaAndInsertDynamicFieldField() {
    final Map<String, Object> props = new HashMap<>();

    props.put("tweetType", "myUuid");
    props.put("userID", UUID.randomUUID().toString());

    xform.configure(props);

    final Schema simpleStructSchema = SchemaBuilder.struct().name("name").version(1).doc("doc").field("tweetType", Schema.OPTIONAL_STRING_SCHEMA).field("userID", Schema.OPTIONAL_STRING_SCHEMA).build();
    final Struct simpleStruct = new Struct(simpleStructSchema).put("tweetType", "42L").put("userID", "42L");

    final SourceRecord record = new SourceRecord(null, null, "test", 0, simpleStructSchema, simpleStruct);
    final SourceRecord transformedRecord = xform.apply(record);

    assertEquals(simpleStructSchema.name(), transformedRecord.valueSchema().name());
    assertEquals(simpleStructSchema.version(), transformedRecord.valueSchema().version());
    assertEquals(simpleStructSchema.doc(), transformedRecord.valueSchema().doc());

    assertEquals(Schema.OPTIONAL_STRING_SCHEMA, transformedRecord.valueSchema().field("tweetType").schema());
    assertEquals("42L", ((Struct) transformedRecord.value()).getString("tweetType"));
    assertEquals(Schema.OPTIONAL_STRING_SCHEMA, transformedRecord.valueSchema().field("userID").schema());
    assertNotNull(((Struct) transformedRecord.value()).getString("userID"));

    // Exercise caching
    final SourceRecord transformedRecord2 = xform.apply(
      new SourceRecord(null, null, "test", 1, simpleStructSchema, new Struct(simpleStructSchema)));
    assertSame(transformedRecord.valueSchema(), transformedRecord2.valueSchema());

  }

  @Test
  public void schemalessInsertDynamicFieldField() {
    final Map<String, Object> props = new HashMap<>();

    props.put("uuid.field.name", "myUuid");

    final Map<String, Object> newRecord = new HashMap<>();

    newRecord.put("tweetType", "INITIAL");
    newRecord.put("userID", UUID.randomUUID().toString());

    xform.configure(newRecord);

    final SourceRecord record = new SourceRecord(null, null, "test", 0,
      null, newRecord);

    final SourceRecord transformedRecord = xform.apply(record);
    assertEquals("INITIAL", ((Map) transformedRecord.value()).get("tweetType"));
    assertNotNull(((Map) transformedRecord.value()).get("userID"));

  }
}