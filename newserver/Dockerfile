FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3089
RUN npm install pm2 -g
CMD ["pm2-runtime", "index.js"]

