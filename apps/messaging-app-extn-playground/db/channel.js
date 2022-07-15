const knex = require("./connection");
const debug = require("../api/util").debug;

// Creates the channels table if it does not exist
async function createTable() {
    debug("Creating the `channels` table...");
    const tableExists = await knex.schema.hasTable("channels");

    if (tableExists) {
        return;
    }

    return knex.schema.createTable("channels", (table) => {
        table.text("id").primary();
        table.text("name");
        table.text("provider_channel_id");
        table.text("pd_company_id");
        table.text("pd_user_id");
        table.text("provider_type");
    });
}

// Get the channel details by user-defined channel ID
async function getById(id) {
    debug("Getting channel:", id);
    return knex.from("channels").select().where("provider_channel_id", id);
}

// Adds a new channel
async function add(channel) {
    debug("Adding channel", channel);
    return knex("channels").insert({
        id: channel.id,
        name: channel.name,
        provider_channel_id: channel.provider_channel_id,
        pd_company_id: channel.pd_company_id,
        pd_user_id: channel.pd_user_id,
        provider_type: channel.provider_type
    });
}

// Deletes a channel based on the provider ID
async function remove(id) {
    debug("Removing channel", id);
    return knex("channels").where({
        provider_channel_id: id
    }).del();
}

// Get all channels
async function getAll() {
    return knex("channels").select();
}

module.exports = {
    createTable,
    add,
    getById,
    getAll,
    remove
};