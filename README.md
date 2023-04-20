# TWEET-APP

### A tweet-app project hosted on docker executed using kafka.


## PROJECT DESCRIPTION

#### This is a personal project using a variety of skills I have learnt so far.

#### The project is split into front end and backend, the whole project is written in TypeScript. The frontend uses ReactJS and the backend uses ExpressJS. The frontend uses a Redux store to persist the app state and axios to communicate with the REST API.
#### The backend communicates with MongoDB and sinks the documents as messages to the relevant Kafka topic, these messages are then consumed by the express server which is sent to the front end.

## TECHNOLOGIES USED

I used HTML, CSS, TYPESCRIPT, NODE, REACT, MONGODB, MONGOOSE, SWAGGER, PROMETHEUS, SONARQUBE,  and EXPRESS to create this app.


## BEFORE YOU START

##### - Install Docker.
##### - Create .env file in projects root folder using the .env-template.
##### - Copy .env file to /tweet-app-backend and /tweet-app-frontend

## AVAILABLE SCRIPTS

##### Run the complete app on Docker:

```cd tweet-app-backend/```
```yarn build```
```./run.sh```

###### Runs the app in the development mode.
###### Front End App: http://localhost:3000
###### Back End App: http://localhost:6868
###### Swagger API UI: http://localhost:6868/docs
###### Prometheus Metrics: http://localhost:6868/metrics


###### The page will reload when you make changes.
###### You may also see any lint errors in the console.

```yarn test```

## RUNNING BACKEND APP INDEPENDANTLY 

```cd tweet-app-backend/```
```yarn build```
```yarn start```

## RUNNING BACKEND APP INDEPENDANTLY 

```cd tweet-app-frontend/```
```yarn start```

## GENERATING SSH KEY FOR JENKINS 

#Run container interactively as user
```docker exec -it jenkins bin/bash```

#Create .ssh directory
```mkdir ~/.ssh && cd ~/.ssh```

#Create ssh key
```ssh-keygen -t rsa -C "The access key for Jenkins"```

#Add the public to authorized_keys file 
```cat id_rsa.pub >> ~/.ssh/authorized_keys```

#Copy the private key to clipboard
```cat id_rsa```


