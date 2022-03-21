const { db } = require('../database/oauth');
const { db: todoDb } = require('../database/todo');

async function handler(req, res) {
    res.send({
        oauth: db,
        todo: todoDb,
    });
}

module.exports = handler;
