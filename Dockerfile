FROM node:14-alpine

WORKDIR /app

COPY index.js index.js
COPY src src
COPY package* .

RUN npm ci --no-audit --production

EXPOSE 3000

CMD [ "node", "index.js" ]
