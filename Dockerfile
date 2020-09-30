FROM node:latest

RUN mkdir -p /app/nowhomes
WORKDIR /app/nowhomes

ADD package.json /app/nowhomes/package.json
ADD package-lock.json /app/nowhomes/package-lock.json
ADD . /app/nowhomes

RUN npm install

CMD [ "npm" , "start" ]