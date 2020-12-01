export function up(knex) {
  return knex.schema.createTable('user_plans', (t) => {
    t.increments('id');
    t.integer('user_id').unsigned().notNullable();
    t.integer('product_id').unsigned().notNullable();
    t.integer('price_id').unsigned().notNullable();
    t.string('subcription_id').notNullable();
    t.dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    t.dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    t.foreign('user_id').references('id').inTable('users');
    t.foreign('product_id').references('id').inTable('products');
    t.foreign('price_id').references('id').inTable('prices');
  });
}

export function down(knex) {
  return knex.schema.dropTable('user_plans');
}
