FROM node:14 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .

FROM node:14
WORKDIR /app
COPY --from=builder /app .
COPY src/screens/config.dev.json ./config.json
CMD ["npm", "start"]
