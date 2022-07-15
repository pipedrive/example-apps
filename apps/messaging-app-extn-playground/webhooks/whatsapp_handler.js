const Router = require("express").Router;
const router = new Router();
const util = require("../api/util");
const debug = util.debug;
// [🔴 IMPORTANT]
// For production-ready apps, please follow the instructions mentioned in the link below
// https://developers.facebook.com/docs/whatsapp/cloud-api/get-started#configure-webhooks
// Similarly, WhatsApp has a retry logic. Make sure you respond with an appropriate status code


// You need to verify webhook registration or else it will not be registered
router.get("/whatsapp/messages/hook", async (req, res) => {
    debug("WhatsApp hook verified. You should be able to receive incoming messages");
    const challenge = req.query["hub.challenge"];
    res.send(challenge);
});

// Parse the incoming message and send it to Pipedrive
// NB! Beware of WhatsApp's retry logic - for now, the endpoint is configured to return *success* no matter what
router.post("/whatsapp/messages/hook", async (req, res) => {
    if (req.body.object) {
        if (
            req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value.messages &&
            req.body.entry[0].changes[0].value.messages[0]
        ) {
            let message = req.body.entry[0].changes[0].value.messages[0];
            let from = message.from; // extract the phone number from the webhook payload
            let msgBody;
            if (message.type === 'text') {
                msgBody = message.text.body; // extract the message text from the webhook payload
            } else {
                msgBody = `Sent [${message.type}]`;
            }
            let msgTime = message.timestamp; // extract the message timestamp from the webhook payload
            try {
                debug(`Incoming message from ${from}.Forwarding message to Pipedrive...`, message);
                await util.sendMessageToPD(
                    req.user.access_token,
                    from,
                    msgBody,
                    msgTime
                );
                debug(`Message forwarded to Pipedrive successfully`);
                res.sendStatus(200);
            } catch (e) {
                debug(`Oopsie, couldn't forward message to Pipedrive.`, e)
                res.sendStatus(200);
            }
        }
    } else {
        res.sendStatus(200);
    }
});

module.exports = router;