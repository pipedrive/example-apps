const pipedriveSdk = require('pipedrive');
const config = require('../../config');
const db = require('../../database');

async function handler(req, res) {
    const apiClient = pipedriveSdk.ApiClient.instance;

    let oauth2 = apiClient.authentications.oauth2;
    oauth2.clientId = config.clientId;
    oauth2.clientSecret = config.clientSecret;
    oauth2.redirectUri = config.redirectUri;

    const { userId, companyId } = req.params;
    const tokens = db.getClientInstallation(userId, companyId);

    oauth2.accessToken = tokens.accessToken;

    const api = new pipedriveSdk.DealsApi();
    const deals = await api.getDeals();

    res.send(deals);
};


module.exports = handler;