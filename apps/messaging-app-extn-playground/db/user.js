const knex = require("./connection");
const debug = require("../api/util").debug;

// Creates the users table if it does not exist
async function createTable() {
    debug("Creating the `users` table");
    const tableExists = await knex.schema.hasTable("users");

    if (tableExists) {
        return;
    }

    await knex.schema.createTable("users", (table) => {
        table.text("user_id").primary();
        table.text("access_token");
        table.text("refresh_token");
        table.integer("expiry");
    });
}

// A dummy function to get the first authorized user in the table
async function getCurrent() {
    return knex.from("users").first();
}

// Adds a new user after successful authorization. 
// Updates the same user with latest credentials upon re-authorization
async function add(user_id, access_token, refresh_token, expiry) {
    debug("Adding user:", user_id);
    return knex("users").insert({
            user_id,
            access_token,
            refresh_token,
            expiry: Date.now() + 3.54e+6 // Expires in ~1h from now
        })
        .onConflict('user_id')
        .merge(['access_token', 'refresh_token', 'expiry']);
}

//Removes an user from the table
async function remove(id) {
    debug("Removing user:", id);
    return knex("users").where({
        user_id: id
    }).del();
}

// Get all users
async function getAll() {
    debug("Getting all users");
    return knex("users").select();
}

module.exports = {
    createTable,
    add,
    getCurrent,
    getAll,
    remove
};