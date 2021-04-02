
SaaS Gear is a React and NodeJS framework that help you build SaaS faster.


Introduction: https://www.notion.so/Saas-Gear-9f791fb27d3b440584e4a5408e19c8d4

## Tech stack

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

### Support databases
- mysql
- mongodb

### Payment
- stripe

## Set up
### 1. Create env
  + You should create `.env` in `app` and `api` folder and copy content from `.env.example` file in each.
### 2. Run migrations
  + `npm run db:migrate`
  + `npm run db:seed`
### 3. Start scripts
  + For backend:
    `cd api`
    `npm run dev`
  + For app:
    `cd app`
    `npm run start`
### 4. Run in browser
  + Open your browser and go `http://localhost:3000`


## License
All code in this repository is provided under the MIT
<br>

