### Struct ture Backend APP

| caches (all cache providers here, Such as redis, memcache, etc)
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| redis.cache.js (redis cache provider config or functionality)
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| memcache.cache.js (redis cache provider config or functionality)
| configs
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| knexfile.js (config for knex)
| constants (all constants for application)
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| status.constant.js (file constant of http status code)
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

![Flow](https://res.cloudinary.com/tuananh-asia/image/upload/v1604460716/ggg_yl8vbk.png)

## If you are using Docker.

### Docker.1: Using this .env
```
DATABASE_NAME=saasgear
DATABASE_HOST=db
DATABASE_PASSWORD=root
DATABASE_USER=root
DATABASE_PORT=3306

JWT_SECRET=JWT_SECRET
JWT_ISSUER=JSLANCER
JWT_SUBJECT=JSLANCER
JWT_AUDIENCE=https://jslancer.com
JWT_EXPIRESIN=12h
JWT_ALGORITHM=HS256

SENDGRID_API_KEY=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
MAIL_FROM=tmtzminhtri@gmail.com

```
### Docker.2: Port of app is 3005

## CREATE MIGRATION FILE

```bash
knex migrate:make --migrations-directory ./migrations #{tableName}
```

## RUN MIGRATION

```bash
yarn db:migrate
```

## ROLLBACK MIGRATION

```bash
yarn db:rollback
```

## CREATE SEED FILE

```bash
knex seed:make #{fileName}
```

## RUN SEED FILE

```bash
yarn db:seed
```

