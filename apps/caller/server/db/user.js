const knex = require('./connection');

/** 
 * Create `users` table to store credentials associated with authorized users.
 */
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
/**
 * Gets a user record by `id`
 */
async function getById(id) {
    const user = await knex.from('users').select().where('id', id);

    return user;
}
/**
 * Adds a new user record with the credentials obtained after authorization.
 */
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