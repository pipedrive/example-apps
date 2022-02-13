const pipedriveSdk = require('pipedrive');

async function handler(req, res) {
    const apiClient = pipedriveSdk.ApiClient.instance;

    let oauth2 = apiClient.authentications.oauth2;
    oauth2.clientId = 'clientId'; // Your Pipedrive App OAuth 2 Client ID
    oauth2.clientSecret = 'clientSecret'; // Your Pipedrive App OAuth 2 Client Secret
    oauth2.redirectUri = 'http://localhost:1800/callback'; // Your Pipedrive App OAuth 2 Redirection endpoint or Callback Uri

    // Getting authorization code from Pipedrive
    const authCode = req.query.code;

    try {
        const tokens = await apiClient.authorize(authCode);

        res.send(tokens);
    } catch (e) {
        throw new Error(e.message);
    }
};


module.exports = handler;