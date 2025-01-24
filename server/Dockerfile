FROM node:18

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR /app/server/dist

EXPOSE 8080

CMD ["node", "index.js"]
