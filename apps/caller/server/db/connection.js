/**
 *  Knex is a SQL query builder for a range of databases
 *  In this case, we are running an in-memory database
 * */

const Knex = require('knex');

const knex = Knex({
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true
});

module.exports = knex;