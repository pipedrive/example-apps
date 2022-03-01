const pipedriveSdk = require('pipedrive');
const config = require('../../config');
const db = require('../../database');

async function handler(req, res) {
    const apiClient = pipedriveSdk.ApiClient.instance;

    let oauth2 = apiClient.authentications.oauth2;
    oauth2.clientId = config.clientId;
    oauth2.clientSecret = config.clientSecret;
    oauth2.redirectUri = config.redirectUri;

    const basicAuthHeader = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
 
    if (`Basic ${basicAuthHeader}` !== req.headers.authorization) {
        res.status(401);
        return res.send('Unauthorized');
    }

    const { user_id: userId, company_id: companyId } = req.body;
    
    db.deleteInstallation(userId, companyId);

    res.send('ok');

};


module.exports = handler;