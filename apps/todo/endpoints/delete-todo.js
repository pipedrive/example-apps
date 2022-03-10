const { deleteRecord } = require('../database/todo');

async function handler(req, res) {
    const { userId, companyId, recordId } = req.params;

    const record = await deleteRecord(userId, companyId, recordId);

    res.send(record);
};

module.exports = handler;