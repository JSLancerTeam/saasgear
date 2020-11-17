export function up(knex) {
  return knex.schema.createTable('user_plans', (t) => {
    t.increments('id');
    t.integer('user_id').unsigned().notNullable();
    t.string('plan_name');
    t.float('price');
    t.string('billing_type');
    t.dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    t.dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    t.foreign('user_id').references('id').inTable('users');
  });
}

export function down(knex) {
  return knex.schema.dropTable('user_plans');
}
