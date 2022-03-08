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
app.get('/callback', require('./apps/todo/oauth/callback'));
app.delete('/callback', require('./apps/todo/oauth/uninstall'));

// Panel handlers
app.get('/surface', (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

// Debug endpoints
app.get('/pipedrive-api-example/:userId/:companyId', require('./apps/todo/oauth/api-example'));
app.get('/db', require('./apps/db'));

// ToDo endpoints
app.get('/todo/:userId/:companyId/', require('./apps/todo/get-todo'));
app.get('/todo/:userId/:companyId/:recordId', require('./apps/todo/get-todo'));
app.post('/todo/:userId/:companyId', require('./apps/todo/create-todo'));
app.put('/todo/:userId/:companyId', require('./apps/todo/update-todo'));
app.delete('/todo/:userId/:companyId/:recordId', require('./apps/todo/delete-todo'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});