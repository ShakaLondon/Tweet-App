FROM confluentinc/cp-kafka-connect-base

# RUN confluent-hub install --no-prompt mongodb/kafka-connect-mongodb:latest
# RUN confluent-hub install  --no-prompt confluentinc/kafka-connect-json-schema-converter:latest
# RUN confluent-hub install --no-prompt confluentinc/connect-transforms:latest
# RUN confluent-hub install --no-prompt debezium/debezium-connector-mongodb:latest

ENV CONNECT_PLUGIN_PATH="/usr/share/java,/usr/local/share/kafka/plugins,/usr/share/confluent-hub-components"

COPY /docker-setup/secrets /tweet-app/utils/secrets
USER root
RUN /tweet-app/utils/secrets/secrets.sh