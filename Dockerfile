FROM node:16.11.0-alpine as base

WORKDIR /app

COPY package*.json /app/
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
RUN apk update && apk add nodejs && npm i -g nodemon
COPY . /app/
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
RUN apk update && apk add nodejs && npm i -g nodemon
COPY . /app/
CMD ["nodemon", "bin/www"]