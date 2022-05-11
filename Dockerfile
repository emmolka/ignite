FROM node:current-alpine
WORKDIR /ignite-data

COPY package*.json ./

RUN npm install

COPY . .
CMD ["npm", "start"]