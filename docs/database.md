# [:blue_square: Database & migration](https://github.com/JSLancerTeam/saasgear/docs/database.md)
Our backend database uses MySQL which is the most popular and stable database management system at this moment. 

In order to fetch and modify data in the database, we use the query builder - [Knex](http://knexjs.org/). Using a query builder helps us escape and sanitize data before putting data into database.

## Create a database

First of all, we need to create a database for our project. You can open the terminal, login into database, and run the following commands:

```jsx
mysql -uroot -p
create database saasgear 
```

## Database config

Our config for database is stored in ./api/.env. You need to replace the value below with your database config.

```jsx
DATABASE_NAME=saasgear
DATABASE_HOST=localhost
DATABASE_PASSWORD=admin
DATABASE_USER=root
DATABASE_PORT=3306
```

## Seed data and migration

You can use fill your database with seed data from the boiderplate with this command:

```jsx
npm run db:seed
```

## Create a query

We use Knex to create query. Queries are stored in **api/respository** folder. Here is an example Knex command to create query to get user data.

```jsx
function getUser(id, type) {
  const users = Object.values(usersColumns);
  const userToken = Object.values(userTokenColumns);
  return database(TABLE)
    .join(TABLES.userToken, usersColumns.id, userTokenColumns.userId)
    .select(union(users, userToken))
    .where({ [usersColumns.id]: id, [userTokenColumns.type]: type })
    .first();
}
```

## Create a new migration

Migrations are like version control for your database, allowing your team to modify and share the application's database schema.

In order to create a migration file, you can run this command:

```jsx
npm run db:create [migration-name]
```

The command above will create a migration file in *./api/migrations* folder. Since this is an empty migration file, you need to fill it with both up and down methods.

**Up** methods is used to modify database, create table, add or remove a column. The **down** method reverts the changes made by **up** method.

```jsx
export function up(knex) {
  return knex.schema.table('users', (table) => {
    table.string('avatar_url');
    table.string('provider');
    table.string('provider_id', 30);
  });
}

export function down(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('avatar_url');
    table.dropColumn('provider');
    table.dropColumn('provider_id');
  });
}
```

## Apply new migration

In order to apply all new migrations, you can run this command:

```jsx
npm run db:migrate
```
