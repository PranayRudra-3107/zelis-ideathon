FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
EXPOSE 3000
ENV SERVER_URL=http://backend:3001
CMD ["npm", "start"]
