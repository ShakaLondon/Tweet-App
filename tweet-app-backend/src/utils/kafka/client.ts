import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
import { EventEmitter } from 'events'
import { Kafka, KafkaConfig, logLevel } from 'kafkajs'

// /**
//  * @hidden
//  * Kafka client abstract class
//  */
export default class KafkaClient {

  createKafka( clientId?: string, brokers?: string[], kafkaConfig?: KafkaConfig ): Kafka {
    const kafka = new Kafka({ 
      clientId: clientId ?? 'tweet-app-broker',
      brokers: brokers ?? [`broker:9092`],
      retry: {
        initialRetryTime: 100,
        retries: 8
      }
    })
    return kafka
  }

  createRegistry( schemaHost: string ): SchemaRegistry {
    const registry = new SchemaRegistry({ 
      host: schemaHost
    })
    return registry
  }
}
