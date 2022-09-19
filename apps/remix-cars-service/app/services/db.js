import Knex from 'knex';

let connection;

if (process.env.NODE_ENV === "production") {
	connection = Knex({
		client: 'sqlite3',
		connection: ':memory:',
		useNullAsDefault: true
	});
} else {
	if (!global.__connection) {
		global.__connection = Knex({
			client: 'sqlite3',
			connection: ':memory:',
			useNullAsDefault: true
		});
	}
	connection = global.__connection;
}


export default connection;
