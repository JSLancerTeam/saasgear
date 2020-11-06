export const seed = function (knex) {
	return knex('users')
		.del()
		.then(function () {
			return knex('users').insert([
				{ email: 'abc@gmail.com', password: 1, name: '1' },
				{ email: 'abc1@gmail.com', password: 1, name: '2' },
				{ email: 'abc2@gmail.com', password: 1, name: '3' },
			]);
		});
};
