# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .
COPY .env .

# Make port 3000 available outside the container
EXPOSE 3000

# Define the command to run your app
CMD ["node", "server.js"]