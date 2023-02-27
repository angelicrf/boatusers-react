FROM node:18.7.0-alpine AS clientBU

ENV NODE_ENV clientBU

WORKDIR .

COPY package.json .

RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 3000

CMD ["npm", "start"]