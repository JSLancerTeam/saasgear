FROM node:14
RUN mkdir -p /var/www/app/landing

WORKDIR /var/www/app/landing

COPY ./landing/package*.json ./

RUN npm install

COPY ./landing ./

EXPOSE 4000

CMD ["npm", "run", "dev"] 
