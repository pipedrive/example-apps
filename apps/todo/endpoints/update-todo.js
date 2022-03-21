const { updateRecord } = require('../database/todo');

async function handler(req, res) {
    const { title, checked, id } = req.body;
    const { userId, companyId, dealId } = req.params;

    if (checked === undefined || title === undefined) {
        res.send('checked or title params are missing');
    }

    await updateRecord(userId, companyId, dealId, { title, checked, id });

    res.send('ok');
}

module.exports = handler;
