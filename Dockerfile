# Stage 1: Build stage with development dependencies
FROM node:16 as build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt module (if necessary)
RUN npm rebuild bcrypt --build-from-source

# Stage 2: Final image with only Node.js runtime
FROM node:16-alpine as final

# Set working directory
WORKDIR /usr/src/app

# Copy built files from the build stage
COPY --from=build /usr/src/app .

# Expose port (not necessary unless running in a container environment)
EXPOSE 3009

# Start the Node.js application
CMD ["node", "index.js"]
