FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn run build

ENV NODE_ENV=dev
ENV PORT=4040

CMD ["yarn", "start"]
