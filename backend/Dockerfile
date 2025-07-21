# backend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY server.js ./server.js
COPY output ./output

EXPOSE 5000
CMD ["node", "server.js"]
