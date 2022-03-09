const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const public = path.join(__dirname, 'public');
const errorHandler = require('./middlewares/error-handler');
const apiClient = require('./middlewares/api-client');

app.use(errorHandler);
app.use(apiClient);
app.use(bodyParser.json());

// OAuth2 Handlers
app.get('/callback', require('./apps/oauth/callback'));
app.delete('/callback', require('./apps/oauth/uninstall'));

// Panel handlers
app.get('/surface', (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

// Debug endpoints
app.get('/pipedrive-api-example/:userId/:companyId', require('./apps/oauth/api-example'));
app.get('/db', require('./apps/db'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});