FROM node:15.2.0-alpine3.10

RUN mkdir -p /usr/src/app
RUN cp package*.json /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk add bash && apk add make

RUN yarn install
RUN yarn global add @vue/cli
