const express = require('express');
require('express-async-errors');
const path = require('path');
const app = express();
const port = 3000;
const public = path.join(__dirname, 'public');
const errorHandler = require('./middlewares/error-handler');

app.use(errorHandler);

app.get('/callback', require('./apps/001-callback-url-oauth/callback'));

app.get('/surface', (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

app.get('/api', (req, res) => {
    res.send('Api!');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});