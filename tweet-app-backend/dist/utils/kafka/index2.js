import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import ip from "ip";
import { Kafka } from "kafkajs";
const host = process.env.HOST_IP || ip.address();
export const kafka = new Kafka({
    clientId: 'tweet-app-second',
    brokers: [`broker:9092`],
});
console.log(kafka, "kafka");
export const registry = new SchemaRegistry({ host: `http://schema-registry:8081` });
console.log(registry, "registry");
