FROM mongo

COPY /docker-setup/mongo-kafka/config-replica.js /
COPY /docker-setup/mongo-kafka/scripts/.bashrc /data/db/.bashrc
COPY /docker-setup/mongo-kafka/requirements.txt /

RUN mkdir /tweet-app
ADD /docker-setup/mongo-kafka/source-connector /tweet-app/utils/mongo-kafka/source-connector
ADD /docker-setup/mongo-kafka/sink-connector /tweet-app/utils/mongo-kafka/sink-connector
ADD /docker-setup/mongo-kafka/scripts /usr/local/bin
RUN chmod +x /usr/local/bin/cx
RUN chmod +x /usr/local/bin/del
RUN chmod +x /usr/local/bin/kc
RUN chmod +x /usr/local/bin/status

RUN apt-get -y update
RUN apt-get install -y --no-install-recommends gettext
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y curl
RUN apt-get install -y python3-pip
RUN apt-get install -y nano
RUN apt-get install -y bsdmainutils
RUN apt-get install -y kafkacat
RUN apt-get install -y git
RUN apt-get install -y dos2unix
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y node-es6-promise

RUN dos2unix /usr/local/bin/*
RUN dos2unix /data/db/.bashrc