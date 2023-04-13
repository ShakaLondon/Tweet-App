import AdminClient from "./admin/index.js";
import UserConsumer from "./user-consumer/index.js";
import TweetConsumer from "./tweet-consumer/index.js";
export default class MessageFactory {
    constructor() {
        this.admin = async (configuration) => await new AdminClient(configuration.clientId, configuration.brokers);
        this.userConsumer = async (configuration) => await new UserConsumer(configuration.clientId, configuration.brokers, configuration.groupId, configuration.topics);
        this.tweetConsumer = async (configuration) => await new TweetConsumer(configuration.clientId, configuration.brokers, configuration.groupId, configuration.topics);
    }
}
