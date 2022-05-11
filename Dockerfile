FROM node:current-alpine
WORKDIR /ignite-data

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]