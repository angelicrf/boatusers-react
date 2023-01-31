FROM node:18.7.0-alpine AS development

ENV NODE_ENV development

WORKDIR .

COPY package.json .

RUN npm install
COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "run"]