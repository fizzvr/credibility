FROM node:16-alpine
LABEL MANTAINER="@fizzvr"

# Create app directory
WORKDIR /app

ENV MONGODB_URI=mongodb://metroroot:metroroot@172.16.253.28:27017/db_metro_logger_dev
COPY package*.json ./

# Bundle app source
COPY . .
RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "start" ]
