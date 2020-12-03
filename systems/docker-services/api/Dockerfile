FROM node:14
RUN mkdir -p /var/www/app/api

WORKDIR /var/www/app/api

COPY ./api/package*.json ./

RUN npm install
RUN npm run postinstall

RUN npm install -g knex
COPY ./api ./

COPY ./api/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

EXPOSE 5000
CMD ["npm", "run", "dev"] 
