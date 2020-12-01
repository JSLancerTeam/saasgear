FROM node:12
RUN mkdir -p /var/www/app/fe

WORKDIR /var/www/app/fe

COPY ./app/package*.json ./

RUN npm install

COPY ./app ./

EXPOSE 3000

CMD ["npm", "run", "start"] 
