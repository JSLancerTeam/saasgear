  
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


![Flow](https://res.cloudinary.com/tuananh-asia/image/upload/v1604460716/ggg_yl8vbk.png)

