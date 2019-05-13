FROM node:10

WORKDIR /source

COPY . .
RUN yarn

EXPOSE 8080

CMD ["yarn", "dev"]