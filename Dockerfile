FROM node:alpine

WORKDIR /srv

COPY package.json ./
RUN npm install
COPY . /srv

CMD nodejs index.js
