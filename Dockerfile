FROM node:22-slim

WORKDIR /app


COPY package*.json ./

RUN npm ci

COPY . .

ARG NODE_ENV
ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL
ENV NODE_ENV=$NODE_ENV

ARG PORT
ENV PORT=$PORT

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "build/index.js"]

