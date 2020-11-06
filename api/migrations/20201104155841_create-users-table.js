export function up(knex) {
	return knex.schema.createTable('users', function (t) {
		t.increments('id');
		t.string('name').notNullable();
		t.string('email').notNullable();
		t.string('password').notNullable();
		t.timestamps(true, true);
		t.unique('email');
	});
}

export function down(knex) {
	return knex.schema.dropTable('users');
}
