# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm start

# Expose the port on which the app will run
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
