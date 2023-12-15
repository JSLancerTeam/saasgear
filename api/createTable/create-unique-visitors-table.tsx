import Knex from 'knex';

export function up(knex: Knex): Knex.SchemaBuilder {
	return knex.schema.createTable('unique_visitors', (t) => {
		t.increments('id');
		t.integer('site_id').unsigned().notNullable();
		t.string('ip_address');
		t.string('country');
		t.string('city');
		t.string('zipcode');
		t.string('continent');
		t.dateTime('first_visit')
			.notNullable()
			.defaultTo(knex.raw('CURRENT_TIMESTAMP'));
		t.foreign('site_id').references('id').inTable('allowed_sites');
	});
}

export function down(knex: Knex): Knex.SchemaBuilder {
	return knex.schema.dropTable('unique_visitors');
}
