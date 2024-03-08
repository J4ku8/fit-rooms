FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

ENV NODE_ENV=dev
ENV PORT=4041

CMD ["yarn", "run","dev"]
