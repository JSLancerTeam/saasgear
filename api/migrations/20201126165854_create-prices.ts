import Knex from 'knex';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('prices', (t) => {
    t.increments('id');
    t.float('amount').notNullable();
    t.string('type').notNullable();
    t.string('stripe_id').notNullable();
    t.integer('product_id').unsigned().notNullable();
    t.dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    t.dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    t.foreign('product_id').references('id').inTable('products');
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('prices');
}
