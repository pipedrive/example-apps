const db = require('../database');

async function handler(req, res) {
    res.send(db.db);
};


module.exports = handler;