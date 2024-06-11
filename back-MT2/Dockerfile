FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY . .
RUN npm install
EXPOSE 80
CMD [ "npm","run","dev" ]

# docker build -t nombre_imagen .
# docker run -p 4000:80 --name back_tr_container back_tr

