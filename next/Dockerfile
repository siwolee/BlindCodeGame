FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build
# RUN npm i && npm run build
