FROM node:20-slim

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "build/index.js"]

