FROM node:alpine as build

WORKDIR /app

# COPY package*.json ./

# COPY . .
RUN npm i
RUN npm run build
# RUN npm i && npm run build
CMD ["sleep", "infinity"]
