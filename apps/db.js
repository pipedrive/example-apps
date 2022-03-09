const { db } = require('../database');

async function handler(req, res) {
    res.send(db);
};


module.exports = handler;