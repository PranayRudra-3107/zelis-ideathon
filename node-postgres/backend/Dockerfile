FROM node:14
WORKDIR /app
COPY package*.json ./
COPY ./ .
RUN npm install
EXPOSE 3001
CMD ["node", "index.js"]
