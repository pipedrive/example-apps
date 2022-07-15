const Knex = require('knex');

// NB! If you are running this app locally, edit the connection path as required
// On Glitch, anything that is under the .data directory is wiped upon remix
const db_path = __dirname + '/../data/db.sqlite';

const knex = Knex({
	client: 'sqlite3',
	connection: db_path,
	useNullAsDefault: true
});

module.exports = knex;