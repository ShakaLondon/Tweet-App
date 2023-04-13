console.log("producer .. ")

import { SchemaGroup, ModelGroup, GroupDocumentType } from "../../../types/schema-types.js"
// import { id } from "../../../services/users/schema.js"
// import { createTopic, fetchTopicList } from "../admin/index.js"


// export const producerOutput = async ( body: SchemaGroup, id: number, topic: string, key?: string) => {
//   console.log("here2")
//   // const topics = await fetchTopicList()
//   console.log("here")


//   // if (!topics.includes(topic)) {
//   //   // createTopic(topic, 0, "compact")
//   // }

//   // console.log(topics, "topic")

// const producer = kafka.producer()

// await producer.connect()

// console.log(body, "body")
  
//     const outgoingMessage = {
//       // key: key ?? null,
//       value: await registry.encode(id, body)
//     }
//     console.log(outgoingMessage, "outgoingMessage")
//     const result = await producer.send({
//       topic: topic,
//       messages: [outgoingMessage],
//     })
//     console.log(result, "result")


// await producer.disconnect()

// return result

// }

// const producer = kafka.producer()

// await producer.connect()

// setInterval(async() => {
//   const currentDate = new Date()
//   console.log(currentDate.toISOString())
//     const message = {
//       "firstName": "Savanah", 
//       "lastName": "Howard", 
//       "email": "Savanah.Howard@test.com", 
//       "loginID": "SavHow22", 
//       "password": "Test@1234", 
//       "contactNumber": "07712345678", 
//       "role": [
//           "USER"
//           ]
//   }
  
//     const outgoingMessage = {
//       // key: JSONUserSchemaID.id.toString(),
//       value: await registry.encode(id, message)
//       // value: JSON.stringify(message)
//     }
//     console.log(outgoingMessage, "outgoingMessage")
//     const result = await producer.send({
//       topic: 'users',
//       messages: [outgoingMessage],
//     })
//     console.log(result, "result")
// }, 6000)