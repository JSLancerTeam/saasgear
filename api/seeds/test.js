export const seed = function (knex) {
	return knex('users')
		.del()
		.then(function () {
			return knex('users').insert([{ user_name: 'Minh Tri1' }, { user_name: 'Minh Tri2' }, { user_name: 'Minh Tri3' }]);
		});
};
