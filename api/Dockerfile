FROM node:12
RUN mkdir -p /usr/src/app/saas_gear

WORKDIR /usr/src/app/saas_gear

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3001

CMD ["npm", "run", "dev"] 
