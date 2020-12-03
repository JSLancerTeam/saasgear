FROM node:14
RUN mkdir -p /var/www/app/api

WORKDIR /var/www/app/api

COPY ./api/package*.json ./

RUN npm install
RUN npm run postinstall

RUN npm install -g knex

COPY /api/auto-migrate-db.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/auto-migrate-db.sh
COPY ./api ./

EXPOSE 5000
ENTRYPOINT ["auto-migrate-db.sh"]
CMD ["npm", "run", "dev"] 
