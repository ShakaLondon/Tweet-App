console.log("consumer .. ");
import createError from "http-errors";
import KafkaClient from "../client.js";
/**
 * Consumes and decodes Orchestrate messages
 */
export default class TweetConsumer {
    constructor(clientId, brokers, groupId, topics) {
        this.tweetsOutArray = [];
        this.consumeAllTweets = async () => {
            try {
                const { REBALANCING, CONNECT } = this.consumer.events;
                await this.consumer.connect();
                await this.consumer.subscribe({ topic: this.topics, fromBeginning: true });
                await this.consumer.on(REBALANCING, async (e) => {
                    console.log(e, "event");
                    await setTimeout(() => { }, 3000);
                });
                return this.runAll();
            }
            catch (error) {
                createError(503, `Error consuming tweets ${error}`);
            }
        };
        this.kafka = new KafkaClient().createKafka(clientId, brokers);
        this.consumer = this.kafka.consumer({ groupId: `${groupId}-${Date.now()}` });
        this.topics = topics;
    }
    async consumeTweetPartition(partition) {
        // Not absolutely necessary but enforces tweet to call connect() before calling consume()
        try {
            const { REBALANCING, CONNECT } = this.consumer.events;
            await this.consumer.connect();
            console.log("here2");
            await this.consumer.subscribe({ topic: this.topics, fromBeginning: true });
            await this.consumer.on(REBALANCING, async (e) => {
                console.log(e, "event");
                await setTimeout(() => { }, 3000);
            });
            // return this.runQuery(query)
            return;
        }
        catch (error) {
            createError(503, `Error consuming tweets ${error}`);
        }
    }
    async consumeSingleTweetType(query) {
        // Not absolutely necessary but enforces tweet to call connect() before calling consume()
        try {
            const { REBALANCING, CONNECT } = this.consumer.events;
            await this.consumer.connect();
            console.log("here2");
            await this.consumer.subscribe({ topic: this.topics, fromBeginning: true });
            await this.consumer.on(REBALANCING, async (e) => {
                console.log(e, "event");
                await setTimeout(() => { }, 3000);
            });
            return this.runQuery(query);
        }
        catch (error) {
            createError(503, `Error consuming tweets ${error}`);
        }
    }
    async runAll() {
        const { END_BATCH_PROCESS, REBALANCING } = this.consumer.events;
        return new Promise((resolve, reject) => {
            this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log(message);
                    const messageOut = await this.handleMessage(message);
                    this.tweetsOutArray.push(messageOut);
                }
            });
            setTimeout(() => {
                reject(createError(500, "An error occurred while getting tweets."));
            }, 4000);
            this.consumer.on(END_BATCH_PROCESS, async (e) => {
                console.log(`disconnected at ${e.timestamp}`);
                await this.consumer.disconnect();
                resolve(this.tweetsOutArray);
            });
        });
    }
    async runQuery(query) {
        const { END_BATCH_PROCESS, REBALANCING } = this.consumer.events;
        return new Promise((resolve, reject) => {
            this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const messageOut = await this.handleSingleMessage(message, query);
                    if (messageOut != null) {
                        this.tweetsOutArray.push(messageOut);
                    }
                }
            });
            setTimeout(() => {
                reject(createError(500, "An error occurred while getting tweets."));
            }, 4000);
            this.consumer.on(END_BATCH_PROCESS, async (e) => {
                console.log(`disconnected at ${e.timestamp}`);
                await this.consumer.disconnect();
                if (this.tweetsOutArray.length > 0) {
                    resolve(this.tweetsOutArray);
                }
                else {
                    reject(createError(500, `Unable to find a tweet ${query.value}`));
                }
            });
        });
    }
    handleMessage(message) {
        const messageValue = JSON.parse(message.value.toString("utf8"));
        const messageKey = JSON.parse(message.key.toString("utf8"));
        console.log(messageValue, "value", messageKey);
        return JSON.parse(message.value.toString("utf8"));
        // return {
        //   value: JSON.parse((message.value as Buffer).toString("utf8")),
        //   key: JSON.parse((message.key as Buffer).toString("utf8")),
        // }
    }
    handleSingleMessage(message, query) {
        console.log(message, "start single");
        const messageValue = JSON.parse(message.value.toString("utf8"));
        const field = query.field;
        console.log(messageValue, "1");
        console.log(query.value, "2");
        if (messageValue[field] === query.value || messageValue[field].includes(query.value)) {
            return {
                value: JSON.parse(message.value.toString("utf8")),
                key: JSON.parse(message.key.toString("utf8")),
            };
        }
        else
            return;
    }
}
