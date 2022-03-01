const pipedriveSdk = require('pipedrive');
const config = require('../../config');
const db = require('../../database');

async function handler(req, res) {
    const apiClient = pipedriveSdk.ApiClient.instance;

    let oauth2 = apiClient.authentications.oauth2;
    oauth2.clientId = config.clientId;
    oauth2.clientSecret = config.clientSecret;
    oauth2.redirectUri = config.redirectUri;

    // Getting authorization code from Pipedrive
    const authCode = req.query.code;

    try {
        const tokens = await apiClient.authorize(authCode);

        const companyId = tokens.access_token.split(':')[0]; // access token has companyId:userId:hash structure
        const userId = tokens.access_token.split(':')[1]; // access token has companyId:userId:hash structure

        db.saveInstallation(userId, companyId, tokens);

        res.send(
            db.getClientInstallation(userId, companyId)
        );
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = handler;