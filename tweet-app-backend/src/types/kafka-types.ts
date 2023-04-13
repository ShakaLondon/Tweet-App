import { Consumer, ConsumerConfig, KafkaConfig, KafkaMessage } from "kafkajs";
import KafkaClient from "../utils/kafka/client";
import AdminClient from "../utils/kafka/admin";
import { IUser } from "./schema-types";

export const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
obj[key]

export interface IKafkaResponse {
  key: string
  value: IUser
}

export interface IQuery {
  field: string
  value: string
}

export interface IUserConsumerConfiguration {
  brokers: string[],
  topics: string[],
  kafkaConfig: KafkaConfig,
  consumerConfig: ConsumerConfig,
}

export interface IKafkaClientConfiguration {
  kafkaConfig: KafkaConfig,
}

export interface IAdminClientConfiguration {
  kafkaConfig: KafkaConfig,
}

export interface IMessageFactory {
  kafka(): KafkaClient;
  admin(): AdminClient
}


export interface SimpleUserConsumer {
  consumeAllUsers(): void;
  consumeSingleUser( query: IQuery ): Promise<IKafkaResponse[] | undefined>;
}

export interface SimpleTweetConsumer {
  consumeAllTweets(): void;
  consumeSingleTweetType( query: IQuery ): Promise<IKafkaResponse[] | undefined>;
}

export interface AdminConsumer {
  createTopic( name: string, numPartitions: number, cleanup: string ): void;
  fetchTopicList(): Promise<string[] | undefined>;
}

export type AdminConfig = {
  clientId: string, 
  brokers: string[]
}

export type IKafkaConfig = {
  clientId: string,
  brokers: Array<string>,
  groupId: string
  topics: string
}