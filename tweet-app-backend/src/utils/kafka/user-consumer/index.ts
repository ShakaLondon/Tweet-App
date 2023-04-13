console.log("consumer .. ")

import { Consumer, EachMessagePayload, ConsumerConfig, KafkaConfig, KafkaMessage, logLevel, Kafka } from "kafkajs";
import createError from "http-errors";
import KafkaClient from "../client.js";
import { IQuery, IKafkaResponse, SimpleUserConsumer } from "../../../types/kafka-types.js";
import { randomUUID } from "crypto";

/**
 * Consumes and decodes Orchestrate messages
 */
export default class UserConsumer implements SimpleUserConsumer{
  private consumer: Consumer
  private kafka: Kafka
  private topics: string
  usersOutArray: IKafkaResponse[] = []

  constructor(
    clientId: string,
    brokers: Array<string>,
    groupId: string,
    topics: string
  ) {
    this.kafka = new KafkaClient().createKafka( clientId, brokers )
    this.consumer = this.kafka.consumer({ groupId: `${groupId}-${Date.now()}` })
    this.topics = topics
  }

  public consumeAllUsers = async () => {
    try {

      const { REBALANCING, CONNECT } = this.consumer.events

      await this.consumer.connect()

        await this.consumer.subscribe({ topic: this.topics, fromBeginning: true })
      
      await this.consumer.on(REBALANCING, async (e) => {
        console.log(e, "event")
        await setTimeout(() => {
          // await consumer.subscribe({ topic, fromBeginning: true })
        }, 3000);
      })

      return this.runAll()
      
    } catch (error) {
      createError(503, `Error consuming messages ${error}`)
    }
  }

  public async consumeSingleUser( query: IQuery ): Promise<IKafkaResponse[] | undefined> {
    // Not absolutely necessary but enforces user to call connect() before calling consume()
    try {

      const { REBALANCING, CONNECT } = this.consumer.events

      await this.consumer.connect()

      console.log("here2")

        await this.consumer.subscribe({ topic: this.topics, fromBeginning: true })
      
      await this.consumer.on(REBALANCING, async (e) => {
        console.log(e, "event")
        await setTimeout(() => {
          // await consumer.subscribe({ topic, fromBeginning: true })
        }, 3000);
      })

      return this.runQuery(query)
  
    } catch (error) {
      createError(503, `Error consuming messages ${error}`)
    }

  }

  private async runAll(): Promise<IKafkaResponse[]> {
    const { END_BATCH_PROCESS, REBALANCING } = this.consumer.events

    return new Promise((resolve, reject) => {

      this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const messageOut = await this.handleMessage(message)
            this.usersOutArray.push(messageOut as IKafkaResponse)
        }
      })

    setTimeout(() => {
        reject(createError(500, "An error occurred while getting users."));
    }, 4000);

      this.consumer.on(END_BATCH_PROCESS, async e => {
        console.log(`disconnected at ${e.timestamp}`)
        await this.consumer.disconnect()
        resolve(this.usersOutArray)
     
       })
    })
  }

  private async runQuery( query: IQuery ): Promise<IKafkaResponse[]> {
    const { END_BATCH_PROCESS, REBALANCING } = this.consumer.events

    return new Promise((resolve, reject) => {

      this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const messageOut = await this.handleSingleMessage(message, query)
            if (messageOut != null) {
            this.usersOutArray.push(messageOut as IKafkaResponse)
            }
        }
      })

      setTimeout(() => {
        reject(createError(500, "An error occurred while getting users."));
    }, 4000);

      this.consumer.on(END_BATCH_PROCESS, async e => {
        console.log(`disconnected at ${e.timestamp}`)
        await this.consumer.disconnect()

        if (this.usersOutArray.length > 0) {
          resolve(this.usersOutArray)
        } else {
          reject(createError(500, `Unable to find a user ${query.value}`));
        }
     
       })
    })
  }


  private handleMessage( message: KafkaMessage ): IKafkaResponse {
    const messageValue = JSON.parse((message.value as Buffer).toString("utf8"))
    const messageKey = JSON.parse((message.key as Buffer).toString("utf8"))

    console.log(messageValue, "value", messageKey)

    return {
      value: JSON.parse((message.value as Buffer).toString("utf8")),
      key: JSON.parse((message.key as Buffer).toString("utf8")),
    }
  }

  private handleSingleMessage( message: KafkaMessage, query: IQuery ): IKafkaResponse | undefined {
    console.log(message, "start single")
    const messageValue: {[key:string]: string } = JSON.parse((message.value as Buffer).toString("utf8"))
    const field = query.field

    console.log(messageValue, "1")
    console.log(query.value, "2")

    if ( messageValue[field] === query.value || messageValue[field].includes(query.value)) {
      return {
        value: JSON.parse((message.value as Buffer).toString("utf8")),
        key: JSON.parse((message.key as Buffer).toString("utf8")),
      }
    } else return 

  }

}
