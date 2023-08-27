FROM node-18
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install
RUN yarn prisma db pull
RUN yarn prisma:seed

COPY . .
EXPOSE 8080
CMD [ "yarn", "start" ]

