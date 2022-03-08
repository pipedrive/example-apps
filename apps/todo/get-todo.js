const { getRecord } = require('../../database/todo');

async function handler(req, res) {
    const { userId, companyId, recordId } = req.params;

    const records = await getRecord(userId, companyId, recordId);

    res.send(records);
};

module.exports = handler;