import KafkaClient from '../index.js';
// async fetchAllUsers ( clientId: string, brokers: string[], groupId: string, topic: string, kafkaConfig?: KafkaConfig ){
// const kafka = new KafkaClient().createKafka( clientId, brokers, kafkaConfig )
// const consumer = kafka.consumer({ groupId: groupId })
export default class ExampleConsumer {
    // private messageProcessor: ExampleMessageProcessor
    constructor(clientId, brokers, groupId, topic, kafkaConfig) {
        //   this.messageProcessor = messageProcessor
        this.kafka = new KafkaClient().createKafka(clientId, brokers, kafkaConfig);
        this.kafkaConsumer = this.kafka.consumer({ groupId: groupId });
    }
    async startConsumer(topic) {
        const topics = {
            topics: topic,
            fromBeginning: false
        };
        try {
            await this.kafkaConsumer.connect();
            await this.kafkaConsumer.subscribe(topics);
            await this.kafkaConsumer.run({
                eachMessage: async (messagePayload) => {
                    const { topic, partition, message } = messagePayload;
                    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
                    console.log(`- ${prefix} ${message.key}#${message.value}`);
                }
            });
        }
        catch (error) {
            console.log('Error: ', error);
        }
    }
    // public async startBatchConsumer(): Promise<void> {
    //   const topic: ConsumerSubscribeTopics = {
    //     topics: ['example-topic'],
    //     fromBeginning: false
    //   }
    //   try {
    //     await this.kafkaConsumer.connect()
    //     await this.kafkaConsumer.subscribe(topic)
    //     await this.kafkaConsumer.run({
    //       eachBatch: async (eachBatchPayload: EachBatchPayload) => {
    //         const { batch } = eachBatchPayload
    //         for (const message of batch.messages) {
    //           const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
    //           console.log(`- ${prefix} ${message.key}#${message.value}`) 
    //         }
    //       }
    //     })
    //   } catch (error) {
    //     console.log('Error: ', error)
    //   }
    // }
    async shutdown() {
        await this.kafkaConsumer.disconnect();
    }
}
