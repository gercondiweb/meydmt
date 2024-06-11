# Use the official Node.js image
FROM node:14
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm install -g nodemon
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
