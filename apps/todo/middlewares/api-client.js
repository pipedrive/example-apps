const pipedriveSdk = require('pipedrive');
const config = require('../config');

async function oauthContext(req, res, next) {
    const apiClient = pipedriveSdk.ApiClient.instance;

    let oauth2 = apiClient.authentications.oauth2;
    oauth2.clientId = config.clientId;
    oauth2.clientSecret = config.clientSecret;
    oauth2.redirectUri = config.redirectUri;

    req.apiClient = apiClient;

    next();
}

module.exports = oauthContext;
