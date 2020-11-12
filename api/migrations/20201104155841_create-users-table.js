export function up(knex) {
	return knex.schema.createTable('users', function (t) {
		t.increments('id');
		t.string('name').notNullable();
		t.string('email').notNullable();
		t.string('password').notNullable();
		t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
		t.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		t.unique('email');
	});
}

export function down(knex) {
	return knex.schema.dropTable('users');
}
