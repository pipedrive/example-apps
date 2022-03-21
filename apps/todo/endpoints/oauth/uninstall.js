const config = require('../../config');
const db = require('../../database/oauth');

async function handler(req, res) {
    const basicAuthHeader = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');

    if (`Basic ${basicAuthHeader}` !== req.headers.authorization) {
        res.status(401);
        return res.send('Unauthorized');
    }

    const { user_id: userId, company_id: companyId } = req.body;

    await db.deleteInstallation(userId, companyId);

    res.send('ok');

}

module.exports = handler;
