import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { Kafka } from 'kafkajs';
// /**
//  * @hidden
//  * Kafka client abstract class
//  */
export default class KafkaClient {
    createKafka(clientId, brokers, kafkaConfig) {
        const kafka = new Kafka({
            clientId: clientId ?? 'tweet-app-broker',
            brokers: brokers ?? [`broker:9092`],
            retry: {
                initialRetryTime: 100,
                retries: 8
            }
        });
        return kafka;
    }
    createRegistry(schemaHost) {
        const registry = new SchemaRegistry({
            host: schemaHost
        });
        return registry;
    }
}
