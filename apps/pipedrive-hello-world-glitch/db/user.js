const knex = require('./connection');

async function createTable() {
	const tableExists = await knex.schema.hasTable('users');

	if (tableExists) {
		return;
	}

	await knex.schema.createTable('users', table => {
		table.increments('id').primary();
		table.text('username');
		table.text('access_token');
		table.text('refresh_token');
	});
}

async function getById(id) {
	const user = await knex.from('users').select().where('id', id);

	return user;
}

async function add(username, access_token, refresh_token) {
	await knex('users').insert({
		username,
		access_token,
		refresh_token
	});
}

module.exports = {
	createTable,
	add,
	getById
};