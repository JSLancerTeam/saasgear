exports.up = function (knex) {
	return knex.schema.createTable('users', function (t) {
		t.increments('id');
		t.string('user_name', 255).notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('users');
};
