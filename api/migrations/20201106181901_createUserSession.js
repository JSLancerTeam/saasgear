export function up(knex) {
	return knex.schema.createTable('user_token', function (t) {
		t.increments('id');
		t.integer('user_id').unsigned().notNullable();
		t.string('token');
		t.string('type');
		t.boolean('is_active').defaultTo(false);
		t.timestamps(true, true);
		t.foreign('user_id').references('id').inTable('users');
	});
}

export function down(knex) {
	return knex.schema.dropTable('user_token');
}
