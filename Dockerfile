FROM node:18


WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

COPY . /usr/src/app


EXPOSE 3000

CMD ["pm2-runtime", "index.js"]
