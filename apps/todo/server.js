const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');

const errorHandler = require('./middlewares/error-handler');
const apiClient = require('./middlewares/api-client');
const jwtCheck = require('./middlewares/jwt-check');
const config = require('./config');

const path = require('path');
const app = express();
const port = 3000;

app.use(errorHandler);
app.use(apiClient);
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'build/static')));

// OAuth2 Handlers
app.get('/callback', require('./endpoints/oauth/callback'));
app.delete('/callback', require('./endpoints/oauth/uninstall'));

// Panel handlers
app.all('/', jwtCheck(config.surfaceJwt), require('./endpoints/surface-render'));

// Debug endpoints
app.get('/pipedrive-api-example/:userId/:companyId', require('./endpoints/oauth/api-example'));
app.get('/db', require('./endpoints/db'));

// Surface endpoints
app.use('/todo/:userId/:companyId/:dealId', jwtCheck(config.surfaceJwt));
app.get('/todo/:userId/:companyId/:dealId', require('./endpoints/get-todo'));
app.get('/todo/:userId/:companyId/:dealId/:recordId', require('./endpoints/get-todo'));
app.post('/todo/:userId/:companyId/:dealId', require('./endpoints/create-todo'));
app.put('/todo/:userId/:companyId/:dealId', require('./endpoints/update-todo'));
app.delete('/todo/:userId/:companyId/:dealId/:recordId', require('./endpoints/delete-todo'));

// Embedded action
// https://pipedrive.readme.io/docs/app-extensions-embedded-actions
app.use('/embedded-action', jwtCheck(config.embeddedActionJwt));

app.get('/embedded-action', require('./endpoints/embedded-action'));
app.post('/embedded-action', require('./endpoints/embedded-action-save'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
