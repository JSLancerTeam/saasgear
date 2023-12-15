import Knex from 'knex';

export function up(knex: Knex): Knex.SchemaBuilder {
	return knex.schema.createTable('impressions', (t) => {
		t.increments('id');
		t.integer('site_id').unsigned().notNullable();
		t.integer('visitor_id').unsigned().notNullable();
		t.boolean('widget_opened').defaultTo(false);
		t.boolean('widget_closed').defaultTo(false);
		t.dateTime('created_at')
			.notNullable()
			.defaultTo(knex.raw('CURRENT_TIMESTAMP'));
		t.foreign('site_id').references('id').inTable('allowed_sites');
		t.foreign('visitor_id').references('id').inTable('unique_visitors');
	});
}

export function down(knex: Knex): Knex.SchemaBuilder {
	return knex.schema.dropTable('impressions');
}
