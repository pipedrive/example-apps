const { deleteRecord } = require('../database/todo');

async function handler(req, res) {
    const { userId, companyId, dealId, recordId } = req.params;

    const record = await deleteRecord(userId, companyId, dealId, recordId);

    res.json(record);
}

module.exports = handler;
