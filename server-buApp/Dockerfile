FROM node:18.7.0-alpine AS serverBU

ENV NODE_ENV serverBU

WORKDIR .

COPY package.json .

RUN npm install
COPY . .

EXPOSE 5000

CMD ["npm", "start"]