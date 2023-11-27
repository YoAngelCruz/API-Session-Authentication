FROM node:16.19.0

WORKDIR /Api-Auth

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . /Api-Auth

EXPOSE 3001

CMD ["node", "app.js"] 
