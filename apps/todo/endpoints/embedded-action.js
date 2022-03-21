async function handler(req, res) {
    res.send({
        data: {
            blocks: {},
            actions: {}
        }
    });
}

module.exports = handler;
