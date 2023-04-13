import { Kafka } from "kafkajs";
import createError from "http-errors";
import KafkaClient from "../index.js";
// group id = `tweet-app-users-consumer`
// schemahost = `http://schema-registry:8081`
// topic = 'tweet-app.test.users'
/**
 * Consumes and decodes Orchestrate messages
 */
export default class UserConsumer extends KafkaClient {
    /**
     * Creates a new instance of the Consumer
     *
     * @param brokers - List of brokers to connect to
     * @param topics - List of topics to consume
     * @param kafkaConfig - Kafka client configuration
     * @param consumerConfig - Consumer configuration
     */
    constructor(schemaHost, clientId, topics, brokers, groupId, kafkaConfig, consumerConfig) {
        super(
        //  schemaHost, clientId, brokers 
        );
        this.topics = topics;
        this.usersOutArray = [];
        this.consumer = this.createConsumer(clientId, brokers, groupId);
    }
    /**
     * Returns the list of topics
     */
    getTopics() {
        return this.topics;
    }
    /**
     * Connects to Kafka and subscribes to each topic
     *
     * @returns a Promise that resolves if the connection is successful and rejects otherwise
     */
    // public async connect(): Promise<void> {
    //   try {
    //     this.isReady = true
    //   } catch (error) {
    //     createError(503, `Error consuming messages ${error}`)
    //   }
    // }
    /**
     * Disconnects from the broker and unsubscribes from the topics
     *
     * @returns a Promise that resolves if the connection is disconnected successfully
     */
    // public async disconnect(): Promise<void> {
    //   try {
    //     await this.checkReadiness()
    //     await this.consumer.disconnect()
    //       this.isReady = false 
    //       console.log("disconnect")
    //   } catch (error) {
    //     createError(503, `Error on disconnect ${error}`)
    //   }
    // }
    /**
     * Starts consuming messages
     */
    async consumeAllUsers() {
        try {
            const topic = this.topics;
            await this.consumer.connect();
            await this.consumer.subscribe({ topic, fromBeginning: true });
            // await this.consumer.subscribe({ topic: this.topics, fromBeginning: true })
            // this.checkReadiness()
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    try {
                        console.log(message, "messageeach");
                        await this.handleMessage(message);
                    }
                    catch (error) {
                        createError(404, `Error reading messages ${error}`);
                    }
                }
            });
            console.log(this.usersOutArray, "result");
            await this.consumer.disconnect();
            // this.removeAllListeners()
            return this.usersOutArray;
        }
        catch (error) {
            createError(503, `Error consuming messages ${error}`);
        }
        // Not absolutely necessary but enforces user to call connect() before calling consume()
        //   await this.connect()
        //   .then(() => this.checkReadiness())
        //   .then(async () => await this.consumer.subscribe({ topic: this.topics, fromBeginning: true }))
        //   .then(async () => {
        //     console.log( this.topics, "consumeAllUsers")
        //   const run = await this.consumer.run({
        //     eachMessage: async ({ topic, partition, message }) => {
        //       console.log(message, "first point")
        //       await this.handleMessage(message)
        //     }
        //   })
        //   console.log(run, "run");
        // })
        // .then(async () => await this.disconnect())
        //   .catch(e => createError(500, `Error consuming messages ${e}`));
    }
    async consumeSingleUser(query) {
        // Not absolutely necessary but enforces user to call connect() before calling consume()
        try {
            const topic = this.topics;
            await this.consumer.connect();
            await this.consumer.subscribe({ topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    try {
                        console.log(message, "messageeach");
                        await this.handleSingleMessage(message, query);
                    }
                    catch (error) {
                        createError(404, `Error reading messages ${error}`);
                    }
                }
            });
            await this.consumer.disconnect();
            // this.removeAllListeners()
            return this.usersOutArray;
        }
        catch (error) {
            createError(503, `Error consuming messages ${error}`);
        }
        //   .then(() => this.checkReadiness())
        //   .then(async () => await this.consumer.subscribe({ topic: this.topics, fromBeginning: true }))
        //   .then(async () => {
        //     console.log("consumeSingleUser")
        //     await this.consumer.run({
        //     eachMessage: async ({ topic, partition, message }) => {
        //       console.log(message, "messageeach")
        //       await this.handleSingleMessage(message, query)
        //     }
        //   })
        // })
        // .then(async () => {
        //   await this.disconnect()
        // })
        // .catch(e => createError(500, `Error consuming messages ${e}`));
    }
    // /**
    //  * Commits the offsets specified by the message
    //  *
    //  * @param message - Message from which to get the offset
    //  */
    // public async commit(message: IResponse): Promise<void> {
    //   this.checkReadiness()
    //   await this.consumer.commitOffsets([
    //     {
    //       offset: (parseInt(message.offset, 10) + 1).toString(),
    //       topic: message.topic,
    //       partition: message.partition
    //     }
    //   ])
    // }
    handleMessage(message) {
        console.log(message, "start");
        const messageValue = JSON.parse(message.value.toString("utf8"));
        messageValue.populate(['role', 'tweetList']);
        console.log(messageValue, "populated");
        this.usersOutArray.push({
            value: JSON.parse(message.value.toString("utf8")),
            key: JSON.parse(message.key.toString("utf8")),
        });
    }
    handleSingleMessage(message, query) {
        console.log(message, "start single");
        const messageValue = JSON.parse(message.value.toString("utf8"));
        const field = query.field;
        if (messageValue[field] === query.value || messageValue[field].includes(query.value)) {
            this.usersOutArray.push({
                value: JSON.parse(message.value.toString("utf8")),
                key: JSON.parse(message.key.toString("utf8")),
            });
        }
    }
    createConsumer(clientId, brokers, groupId, config) {
        const kafka = new Kafka({
            clientId: clientId,
            brokers: brokers,
        });
        const consumer = kafka.consumer({
            groupId: groupId,
            // rebalanceTimeout: 120000,
            // maxWaitTimeInMs: 100000,
            // sessionTimeout: 60000
            // ...config 
        });
        return consumer;
    }
}
