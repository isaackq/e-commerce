# API Dockerfile
FROM node:22.12-alpine

RUN apk add --no-cache make gcc g++ python3 libc6-compat

# Set working directory
WORKDIR /www

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --include=optional

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose the API port
EXPOSE 3000

# Lancer l'application en mode développement
CMD ["npm", "run", "start:dev"]