const path = require('path');

async function handler(req, res) {
    res.sendFile(path.join(path.join(__dirname, '../build'), 'index.html'));
}

module.exports = handler;
