const pipedriveSdk = require('pipedrive');
const db = require('../../database/oauth');

async function handler(req, res) {
    const { userId, companyId } = req.params;
    const tokens = await db.getClientInstallation(userId, companyId);

    let { oauth2 } = req.apiClient.authentications;

    oauth2.accessToken = tokens.accessToken;

    const api = new pipedriveSdk.DealsApi();
    const deals = await api.getDeals();

    res.send(deals);
}

module.exports = handler;
