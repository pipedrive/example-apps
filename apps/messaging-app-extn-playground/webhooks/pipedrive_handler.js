const Router = require("express").Router;
const router = new Router();
const multer = require("multer");
const upload = multer();
const util = require("../api/util");
const debug = util.debug;
// This endpoint responds with a message 'id' which should be unique. 
// Currently this is mocked by appending current timestamp. 
// We also prefix it with 'pd' to identify the message type and associate it with a dummy sender.
router.post(
    "/channels/:providerChannelId/messages",
    upload.none(),
    async (req, res) => {
        const msg_body = req.body;
        const message = msg_body.message,
            recipient = msg_body.recipientIds[0];
        debug('Incoming message from Pipedrive');
        try {
            await util.sendMessageToWA(message, recipient);
            const messageId = "msg-pd-" + Date.now();
            debug('Message sent to WhatsApp. Responding with message ID');
            res.send({
                success: true,
                data: {
                    id: messageId
                },
            });
        } catch (e) {
            debug('Error while sending message to WhatsApp', e);
            res.sendStatus(500);
        }
    }
);

module.exports = router;