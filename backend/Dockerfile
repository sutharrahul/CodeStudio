FROM node:22-slim

RUN mkdir /code
WORKDIR /code

COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma/schema.prisma ./prisma/schema.prisma

RUN npm i
COPY . .
RUN npm run build

RUN apt-get update && apt-get install -y g++ default-jre python3 && rm -rf /var/lib/apt/lists/*

EXPOSE 3001
RUN rm -rf src tsconfig.json

CMD [ "node", "dist/main.js" ]
