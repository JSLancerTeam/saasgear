FROM node:14
RUN mkdir -p /var/www/app/api

WORKDIR /var/www/app/api

COPY ./api/package*.json ./

RUN npm install
RUN npm run postinstall

RUN npm install -g knex

COPY ./api ./

EXPOSE 5000

CMD ["npm", "run", "dev"] 
