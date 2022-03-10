const { db } = require('../database/oauth');

async function handler(req, res) {
    res.send(db);
};


module.exports = handler;