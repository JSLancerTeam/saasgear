export function up(knex) {
	return knex.schema.table('users', function (t) {
		t.boolean('isActive').defaultTo(false);
	});
}

exports.down = function (knex) {};
