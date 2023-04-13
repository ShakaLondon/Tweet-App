import createError from "http-errors";
import KafkaClient from "../client.js";
/**
 * Consumes and decodes Orchestrate messages
 */
export default class AdminClient {
    constructor(clientId, brokers) {
        const kafka = new KafkaClient().createKafka(clientId, brokers);
        this.admin = kafka.admin();
    }
    /**
     * Creates a new instance of the Consumer
     *
     * @param name - Name of new topic
     * @param numPartitions - No. of partitions
     * @param cleanup - Cleanup policy
     */
    async createTopic(name, numPartitions, cleanup) {
        try {
            await this.admin.connect();
            await this.admin.createTopics({
                topics: [{
                        topic: name,
                        numPartitions: numPartitions,
                        configEntries: [{ name: 'cleanup.policy', value: cleanup }]
                    }]
            });
            await this.admin.disconnect();
        }
        catch (error) {
            createError(404, `Error creating topics ${error}`);
        }
    }
    /**
* Starts consuming messages
*/
    async fetchTopicList() {
        try {
            await this.admin.connect();
            const topics = await this.admin.listTopics();
            await this.admin.disconnect();
            return topics;
        }
        catch (error) {
            createError(404, `Error fetching topics ${error}`);
        }
    }
}
// const admin = kafka.admin()
// export const createTopic = async (name: string, numPartitions: number, cleanup: string) => {
// await admin.connect()
// await admin.createTopics({
//     topics: [{
//         topic: name,
//         numPartitions: numPartitions,
//         configEntries: [{ name: 'cleanup.policy', value: cleanup }]
//     }]
// })
// await admin.disconnect()
// }
// export const fetchTopicList = async () => {
//     console.log( "topics not connected")
//     await admin.connect()
//     console.log( "topics connected")
//     const topics = await admin.listTopics()
//     await admin.disconnect()
//     return topics
//     }
