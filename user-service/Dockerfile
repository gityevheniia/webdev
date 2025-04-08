FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Додаємо .env
COPY .env .env

CMD ["npm", "run", "start:dev"]
