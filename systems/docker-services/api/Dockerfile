FROM node:12
RUN mkdir -p /var/www/app/api

WORKDIR /var/www/app/api

COPY ./api/package*.json ./

RUN npm install

COPY ./api ./

EXPOSE 3001

CMD ["npm", "run", "dev"] 
