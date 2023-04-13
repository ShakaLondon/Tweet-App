FROM node

WORKDIR /tweet-app-backend
COPY package.json .
RUN yarn install
COPY . .
CMD yarn start
