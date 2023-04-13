import KafkaClient from "./client.js";
import AdminClient from "./admin/index.js";
import UserConsumer from "./user-consumer/index.js";
import { AdminConfig, IKafkaResponse, IKafkaConfig } from "../../types/kafka-types.js";
import { Consumer } from "kafkajs";
import TweetConsumer from "./tweet-consumer/index.js";

export default class MessageFactory {
    admin = async (configuration: AdminConfig): Promise<AdminClient> => await new AdminClient(configuration.clientId, configuration.brokers);
    userConsumer = async (configuration: IKafkaConfig): Promise<UserConsumer> => await new UserConsumer(configuration.clientId, configuration.brokers, configuration.groupId, configuration.topics);
    tweetConsumer = async (configuration: IKafkaConfig): Promise<TweetConsumer> => await new TweetConsumer(configuration.clientId, configuration.brokers, configuration.groupId, configuration.topics);
}