export function up(knex) {
  return knex.schema.table('users', (t) => {
    t.boolean('is_active').defaultTo(false);
  });
}

export async function down(knex) {
  const exists = await knex.schema.hasColumn('users', 'isActive');
  if (exists) {
    return knex.schema.table('users', (t) => {
      t.dropColumn('isActive');
    });
  }
  return true;
}
