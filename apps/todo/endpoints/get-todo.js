const { getRecord } = require('../database/todo');

async function handler(req, res) {
    const { userId, companyId, dealId, recordId } = req.params;

    const records = await getRecord(userId, companyId, dealId, recordId);

    res.send(records);
};

module.exports = handler;