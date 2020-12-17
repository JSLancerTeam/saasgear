export function up(knex) {
  return knex.schema.createTable('documents', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.text('body').notNullable().collate('utf8mb4_unicode_ci');
    t.integer('user_id').unsigned().notNullable();
    t.dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    t.dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    t.dateTime('deleted_at');
    t.foreign('user_id').references('id').inTable('users');
  });
}

export function down(knex) {
  return knex.schema.dropTable('documents');
}
