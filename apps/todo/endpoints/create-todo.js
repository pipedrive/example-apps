const { saveRecord } = require('../database/todo');

async function handler(req, res) {
    const { title } = req.body;
    const { userId, companyId } = req.params;

    if (!title) {
        return res.send('title is not set');
    }

    await saveRecord(userId, companyId, { title });

    res.send('ok');
};

module.exports = handler;