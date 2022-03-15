const path = require('path');

async function handler(req, res) {
    console.log(req.params);
    console.log(req.body); 
    console.log(req.query);

    res.sendFile(path.join(path.join(__dirname, '../build'), 'index.html'));
};

module.exports = handler;