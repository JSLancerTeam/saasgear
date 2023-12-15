import Knex from 'knex';

export function up(knex: Knex): Knex.SchemaBuilder {
	return knex.schema.createTable('allowed_sites', (t) => {
		t.increments('id');
		t.integer('user_id').unsigned().notNullable();
		t.string('url');
		t.dateTime('created_at')
			.notNullable()
			.defaultTo(knex.raw('CURRENT_TIMESTAMP'));
		t.dateTime('updated_at')
			.notNullable()
			.defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		t.foreign('user_id').references('id').inTable('users');
	});
}

export function down(knex: Knex): Knex.SchemaBuilder {
	return knex.schema.dropTable('allowed_sites');
}
