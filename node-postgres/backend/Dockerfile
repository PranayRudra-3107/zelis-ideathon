FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source
COPY ./ .
EXPOSE 5000
CMD ["node", "index.js"]
