const { saveRecord } = require('../database/todo');

async function handler(req, res) {
    const { userId, companyId, selectedIds: dealId } = req.query;
    const { block_new_task: title } = req.body;

    if (!title) {
        res.status(400);
        return res.send({
            error: {
                message: "Task cannot be empty"
            }
        });
    }

    const data = await saveRecord(userId, companyId, dealId, { title });

    res.send({
        success: {
            message: "Successfully done",
            type: "snackbar",
            refreshPanelData: true,
        }
    });
}

module.exports = handler;
