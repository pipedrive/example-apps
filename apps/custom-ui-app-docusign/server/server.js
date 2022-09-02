const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const debug = require('debug')('app:server');
const util = require('./util/helper');

require('dotenv').config()
debug('Environment variables loaded');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const auth = require('./routes/auth');
const ui = require('./routes/ui');
const api = require('./routes/api');

debug('Routes loaded');


app.use(express.static('public'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
debug('Serving static assets from public dir, HBS set as view engine');


app.use(auth);
app.use(ui);
app.use(api);

app.listen(process.env.PORT || 3000, util.logImportantURLs);