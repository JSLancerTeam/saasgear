# [Setup project](https://github.com/JSLancerTeam/saasgear/docs/setup.md)
## Set up
### I. Without Docker (Skip this step if you want to using Docker)
#### 1. Create env
  + You should create `.env` in `app` and `api` folder and copy content from `.env-example` file in each.

#### 2. Start scripts
  + For backend: `npm run dev`
  + For app: `npm run start`
  + For landing: `npm run dev`
#### 3. Run in browser
  + Open your browser and type
    + For Front-end: `http://localhost:3000`
    + For Back-end: `http://localhost:5000`
    + For Landing page: `http://localhost:4000`


### II. With docker 
#### 1. Create env
  + You should create `.env` in `app` and `api` folder and copy content from `.env-example` file in each.
  + You must follow the `docker-compose.yml` file to ensure that you are using correctly port for each container
  + So for the API. please change PORT in `.env` file to `5000`. Because the `EXPOSE PORT` in `Dockerfile` is `5000`
  + Or if you want to change that port to another ports, you must be edit it in docker-compose.yml (after colon in `ports` options in your service) and systems/docker-services/CHANGED_PLATFORM/Dockerfile and set your `PORT` in `EXPOSE` option. And rembember that, Both `PORT` value in `Dockerfile` and `docker-compose.yml -> SERVICE_NAME -> ports -> after colon` must be the same.

#### 2. Build Docker container
+ Build all containers by `docker-compose build`

#### 3. Start all Docker Services
+ You can start docker services by using `docker-compose up` to start all services in this app. You can using `-d` option to run backgroundly.
#### 4. Open and experience that.
+ For Front-end: `http://saasgear.local`
+ For Back-end: `http://api-saasgear.local/graphql`
#### 5. Custom domain
+ If you want to custom domain to your favorite, You can:
+ Go to `systems/docker-services/nginx/conf`
+ Choose your app you want to custom domain
+ Open that config file and change `server_name` option to your domain.
+ Save and run
  + `docker-compose build nginx`
  + `docker-compose restart nginx`
  + Change `hosts` file and add `127.0.0.1 YOUR_DOMAIN_HERE`
#### 6. Backend Knex
+ Knex is installed in `api` containers
+ So if you want to create migrate or anything. You can access to docker container:
  > docker-compose exec api /bin/bash
+ And run create migrate. Good luck!
#### 7. DB Management Tool
We already set up `ADMINER` tool for DB management. So you can go to `http://localhost:33061` and you can interact with your data.
Default environment. It is set in `docker-compose.yml` file
```
environment:
  MYSQL_ROOT_PASSWORD: root
  MYSQL_DATABASE: saas
  MYSQL_PASSWORD: root
```
