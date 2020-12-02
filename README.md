
SaaS Gear is a React and NodeJS framework that help you build SaaS faster.


Introduction: https://www.notion.so/Saas-Gear-9f791fb27d3b440584e4a5408e19c8d4

## Technology stack

### Front-end
- nextjs
- react
- tailwind
- styled-component
- react-apollo
- react-router-dom
- react-hook-form
- dayjs
- webpack

### Back-end
- expressjs
- jwt
- apollo-server-express
- dotenv
- helmet
- redis
- knex

### Database
- mysql
- mongoose

### Payment
- stripe

## License
All code in this repository is provided under the MIT  
<br>
  
## Set up with Docker
### 1. Create env  
  + Create two .env files and copy sample in .env-example file to each .env file in `api` and `app` folder.  
### 2. Install dependencies  
  + 2.1. Install dependencies for API  
    + RUN ```cd api && npm install```  
    + if it fail. Run ```npm install``` again for link module alias.  
  + Install dependencies for React App  
    + Run ```cd app && npm install```.
  + Install dependencies for Landing Page  
    + Run ```cd landing && npm install```.
### 3. Build Docker
    > You must be in root source
  + 3.1. Build all Dockerfile
    + Run ```docker-compose build```
  + 3.2. Start docker containers
    + Run ```docker-compose up -d``` to start all container

### 4. Setup hosts
  + 4.1 Open `hosts` file to edit  
    > If you are using Linux or MacOS
    + Run command ```sudo nano /etc/hosts```  

    > If you are using Window 10
    + Open Notepad with `Administrator`
    + In Notepad, click `File > Open`
    + Navigate to `c:\windows\system32\drivers\etc`
    + In the lower-right corner, just above the `Open` button, click the drop-down menu to change the file type to `All Files`.
    + Choose `hosts` file to edit
  + 4.2 Update `hosts` file  
    > Please paste this to your `host` file
    ```
    127.0.0.1	saasgear.local
    127.0.0.1	api-saasgear.local
    127.0.0.1	landing-saasgear.local
    ```
  + 4.3 Save and exit

### 5. Run in browser
  + Open your browser and type
    + For Front-end: `http://saasgear.local`
    + For Back-end: `http://api-saasgear.local/graphql`
    + For Landing page: `http://landing-saasgear.local`
  + If you don't want to config `hosts` file  
    + You can run into:
      + For Front-end: `http://localhost:3002`
      + For Back-end: `http://localhost:5001/graphql`
      + For Landing page: `http://localhost:4001`

### 6. Backend Knex
  + Knex is installed in `api` containers
  + So if you want to create migrate or anything. You can access to docker container:
    > docker-compose exec api /bin/bash
  + And run create migrate. Good luck!