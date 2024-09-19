FROM node:alpine as build

WORKDIR /app

COPY . .

# CMD ["sleep", "infinity"]
# ENTRYPOINT ["sh" , "-c"]
RUN npm i 
RUN npm run build

ENTRYPOINT [ "cp", "-rf" ]
CMD ["build","out"]