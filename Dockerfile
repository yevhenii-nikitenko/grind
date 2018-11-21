FROM node:10-slim

RUN mkdir /usr/src/grind

WORKDIR /usr/src/grind

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 2323

CMD [ "yarn", "dev" ]