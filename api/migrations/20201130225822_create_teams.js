export function up(knex) {
  return Promise.all([
    knex.schema.createTable('teams', (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('alias').notNullable();
      table.unique('alias');
      table.dateTime('created_at')
        .notNullable()
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at')
        .notNullable()
        .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.dateTime('deleted_at');
      table.integer('created_by').unsigned().notNullable();
    }),
    knex.schema.createTable('team_invitations', (table) => {
      table.string('email').notNullable();
      table.integer('team_id').unsigned().notNullable();
      table.foreign('team_id').references('id').inTable('teams');
      table.unique(['email', 'team_id']);
      table.unique('token');
      table.string('token').notNullable();
      table.enu('status', ['active', 'inactive']).notNullable();
      table.dateTime('send_at')
        .notNullable();
      table.dateTime('valid_until')
        .notNullable();
      table.integer('invited_by').unsigned().notNullable();
      table.foreign('invited_by').references('id').inTable('users');
    }),
    knex.schema.createTable('team_members', (table) => {
      table.integer('user_id').unsigned().notNullable();
      table.integer('team_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users');
      table.foreign('team_id').references('id').inTable('teams');
      table.unique(['user_id', 'team_id']);
      table.enu('status', ['pending', 'active', 'inactive']).notNullable();
      table.dateTime('created_at')
        .notNullable()
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.dateTime('updated_at')
        .notNullable()
        .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.dateTime('deleted_at');
      table.string('invitation_token');
      table.foreign('invitation_token').references('token').inTable('team_invitations');
    }),
  ]);
}

export function down(knex) {
  return Promise.all([
    knex.schema.dropTable('team_invitations'),
    knex.schema.dropTable('team_members'),
    knex.schema.dropTable('teams'),
  ]);
}
