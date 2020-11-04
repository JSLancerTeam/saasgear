
SaaS Gear is a React and NodeJS framework that help you build SaaS faster.

## Features
**React and Tailwind UI**
Create beautiful and powerful UI with React. Tailwind makes it easy to customize and override style.

**GraphQL API**
Fetching all the data you need with a single API call using GraphQL. Multiple GraphQL is merged in a single request.

**Subscription payments**
We have integrated Stripe subscription payment to allow you monetize your SaaS.

**Teams**
Your users are able to invite their teammates to their account.

**Roles and Permissions**
Your users are only able to access the data and perform the actions that are allowed within their roles and permissions.

**Authentication**
User authentication with Google, Github, Facebook and email. Signup, login, reset password are included out of the box.

**Cross-browsers and mobile responsiveness**
Every single components have been tested across many different browsers and devices to make sure it works every where.

**HTML Emails**
Send beautiful and responsive HTML emails to your customers with MailChimp or SendGrid.

**Easy to upgrade**
Easy release is planned and tailored carefully to make sure your upgrade experience smooth and painless.

## Structure
**landing page**: the landing page is built with React and NextJS. It is SEO friendly and server rendering. We have ready to use components like TopNavigation, Portfolio, HeroBanner, Testomonial, Plans, Signup and Login forms. All of these components help you to build the landing page for your SAAS quickly
**app**: App is a ReactJS and Apllo application that will handle most of the important tasks of your Saas.
**api**: This is an ExpressJS/GraphQL server. GraphQL is a flexible API (vs static RestFUL api) and it helps you fetch all of the data in a single requests.

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

## Support
Please join our Slack community for support: jslancer.slack.com

## License
All code in this repository is provided under the MIT
  
  
  
  
### Struct ture Backend APP
| caches (all cache providers here, Such as redis, memcache, etc)  
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| redis.cache.js (redis cache provider config or functionality)  
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| memcache.cache.js (redis cache provider config or functionality)  
| constants (all constants for application)  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  status.constant.js (file constant of http status code) 
| database  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| db.config.js (Config database)  
| docs (All documents here, such as Postman collection, schema docs, mutation, query, etc)  
| graphql  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| resolvers (All graphql resolver)    
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| user.resolver.js -> resolver of user feature  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| scalars (custom scalars for graphql type and input)  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| date.scalar.js -> custom date scalar  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| schemas (graphql schemas)  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| user.schema.js -> schema for feature user
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| root.resolver.js -> this file combine all resolver  
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| root.schema.js -> this file combine all schema   
| helpers (Helpers function)  
| libs (implement libs here)  
| logs (logs to tracing error)  
| middlewares (define all middlewares of rest or graphql here)    
| migrations (migrations database, can contain seed db)  
| public (all static file of backend app, images, video ....)  
| queue (queue handler)  
| repository (interact with databases or db schema)  
| services (all logic of a request here)  
| utils (utils for support validation, logger, etc.)  
.env  
.env-example  
package.json  
README.md  
server.js  




