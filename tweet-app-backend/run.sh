#!/bin/bash

source .env

echo "Building the MongoDB Kafka Connector"

echo "Starting docker ."

docker compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
rm -rf /tmp/kafka-logs /tmp/zookeeper

docker-compose up -d --build

sleep 5
echo -ne "\n\nWaiting for the systems to be ready.."

until $(curl --output /dev/null --silent --head --fail http://localhost:8083); do
    printf '.'
    sleep 1
done

# docker-compose exec mongo1 mongosh --authenticationDatabase  "admin" -u ${MONGODB_USER} -p ${MONGODB_PASSWORD}

echo -e "\nKafka Topics:"
curl -X GET "http://localhost:8082/topics" -w "\n"

echo -e "\nKafka Connectors:"
curl -X GET "http://localhost:8083/connectors/" -w "\n"

echo -e "\nKafka Connector Plugins:"
curl -X GET "http://localhost:8083/connector-plugins/" -c '.[] | select( .class == "com.mongodb.kafka.connect.MongoSourceConnector" or .class == "com.mongodb.kafka.connect.MongoSinkConnector" )'


echo -e "\nAdding MongoDB Kafka Sink Connector for the 'source' topic into the 'test.source' collection:"
curl -X POST -H "Content-Type: application/json" -d @src/utils/mongo-kafka/debezium/users-debezium-connector.json http://localhost:8083/connectors -w "\n"

echo -e "\nAdding MongoDB Kafka Sink Connector for the 'source' topic into the 'test.source' collection:"
curl -X POST -H "Content-Type: application/json" -d @src/utils/mongo-kafka/source-connector/user-source-connector.json http://localhost:8083/connectors -w "\n"

curl -X POST -H "Content-Type: application/json" -d @src/utils/mongo-kafka/source-connector/tweet-source-connector.json http://localhost:8083/connectors -w "\n"

curl -X POST -H "Content-Type: application/json" -d @src/utils/mongo-kafka/debezium/tweets-debezium-connector.json http://localhost:8083/connectors -w "\n"


# echo -e "\nAdding MongoDB Kafka Source Connector for the 'test.sink' collection:"
# curl -X POST -H "Content-Type: application/json" -d @src/utils/mongo-kafka/sink-connector/mongo-sink-connector.json http://localhost:8083/connectors -w "\n"
sleep 2

echo -e "\nKafka Connectors: \n"
curl -X GET "http://localhost:8083/connectors/" -w "\n"