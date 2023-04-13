console.log("consumer .. ");
import KafkaClient from "../index.js";
export const userConsumer = async (clientId, brokers, groupId, topic, kafkaConfig) => {
    const kafka = new KafkaClient().createKafka(clientId, brokers, kafkaConfig);
    const consumer = kafka.consumer({ groupId: groupId });
    await consumer.connect();
    console.log("here");
    // await consumer.subscribe({ topic: 'test.users', fromBeginning: true })
    const { END_BATCH_PROCESS, GROUP_JOIN, REBALANCING } = consumer.events;
    const output = [];
    await consumer.on(REBALANCING, async (e) => {
        console.log(e, "event");
        await setTimeout(() => {
            // await consumer.subscribe({ topic, fromBeginning: true })
        }, 4000);
    });
    await consumer.on(GROUP_JOIN, (e) => {
        console.log(e, "event");
        setTimeout(() => {
            // await consumer.subscribe({ topic, fromBeginning: true })
        }, 2000);
    });
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const decodedMessage = {
                value: JSON.parse(message.value.toString("utf8")),
                key: JSON.parse(message.key.toString("utf8")),
            };
            console.log(decodedMessage);
            output.push(decodedMessage);
        },
    });
    // await consumer.on(END_BATCH_PROCESS, async e => {
    //   console.log(`disconnected at ${e.timestamp}`)
    //   await consumer.disconnect()
    return output;
    //  })
};
