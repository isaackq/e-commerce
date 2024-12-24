# API Dockerfile
FROM node:22.12-alpine

# Set working directory
WORKDIR /www

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose the API port
EXPOSE 3000