const db = require('../../database/oauth');

async function handler(req, res) {
    // Getting authorization code from Pipedrive
    const authCode = req.query.code;

    try {
        const tokens = await req.apiClient.authorize(authCode);

        const companyId = tokens.access_token.split(':')[0]; // access token has companyId:userId:hash structure
        const userId = tokens.access_token.split(':')[1]; // access token has companyId:userId:hash structure

        await db.saveInstallation(userId, companyId, tokens);

        res.json(
            await db.getClientInstallation(userId, companyId)
        );
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = handler;
