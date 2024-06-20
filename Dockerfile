# Stage 1: Build Node.js app
FROM node:16 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


# Rebuild bcrypt module
RUN npm rebuild bcrypt --build-from-source

# Stage 2: Final image with only Node.js runtime
FROM node:16 as final

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .


EXPOSE 3009

# Start the Node.js application
CMD ["node", "index.js"]
