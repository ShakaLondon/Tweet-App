# FROM node

# WORKDIR /tweet-app-frontend
# COPY package.json .
# COPY yarn.lock .
# RUN yarn install
# COPY . .
# RUN yarn build

FROM node
# Create app directory
WORKDIR /tweet-app-frontend
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN yarn install
#To bundle your app’s source code inside the Docker image, use the COPY instruction:
COPY . .
#Your app binds to port 3000 so you’ll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 3000
CMD yarn start