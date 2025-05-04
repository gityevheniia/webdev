FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps && npm audit fix

COPY . .


CMD ["npm", "run", "start:dev"]
