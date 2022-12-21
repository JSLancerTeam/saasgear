import Knex from 'knex';

export function up(knex: any): Knex.SchemaBuilder {
  return knex.schema.createTable('products', (t: any) => {
    t.increments('id');
    t.string('name').notNullable();
    t.string('type').notNullable();
    t.string('stripe_id').notNullable();
    t.dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    t.dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    t.unique(['type']);
  });
}

export function down(knex: any): Knex.SchemaBuilder {
  return knex.schema.dropTable('products');
}
