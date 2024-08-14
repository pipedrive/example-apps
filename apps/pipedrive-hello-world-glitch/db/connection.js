const Knex = require('knex');

const knex = Knex({
	client: 'sqlite3',
	connection: ':memory:',
	useNullAsDefault: true
});

module.exports = knex;