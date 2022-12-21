import Knex from 'knex';

export function up(knex: any): Knex.SchemaBuilder {
  return knex.schema.createTable('user_tokens', (t: any) => {
    t.increments('id');
    t.integer('user_id').unsigned().notNullable();
    t.string('token');
    t.string('type');
    t.boolean('is_active').defaultTo(true);
    t.dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    t.dateTime('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    t.foreign('user_id').references('id').inTable('users');
  });
}

export function down(knex: any): Knex.SchemaBuilder {
  return knex.schema.dropTable('user_tokens');
}
