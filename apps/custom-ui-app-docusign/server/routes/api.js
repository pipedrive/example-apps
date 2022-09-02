const Router = require("express").Router;
const router = new Router();
const db = require("../data/connection");
const util = require("../util/helper");

const debug = require('debug')('app:api');

// Handle settings update
router.post("/api/settings", async (req, res) => {
    try {
        await db.updateSettings(req.body.company_id, req.body.settings);
        debug("Settings updated");
        res.send({
            success: true
        });
    } catch (error) {
        return util.getErrorResponse("Could not update app settings", error, 500, res);
    }
});

// Generate preview of the DocuSign template
router.post("/api/generate_preview", async (req, res) => {
    try {
        let settings = await db.getSettings(req.body.company_id);
        if (settings.configured) {
            let url = await util.generateTemplatePreviewURL(req.body.template_id, settings.values.docusign_accid, settings.values.docusign_token);
            debug("Template Preview Generated");
            res.send({
                success: true,
                data: url.data
            });
        } else {
            throw new Error("Settings are not configured. Make sure you update them in the App Settings page");
        }
    } catch (error) {
        return util.getErrorResponse("Could not generate the template preview URL", error, 500, res);
    }
});

// Sends a document generated from the template
router.post("/api/send_document", async (req, res) => {
    try {
        const token = await db.getToken(req.body.company_id);
        const settings = await db.getSettings(req.body.company_id);
        if (settings.configured) {
            const deal = await util.getDeal(req.body.deal_id, token.value);
            if (deal.person_id.email.length > 0) {
                const signer_email = deal.person_id.email[0].value,
                    signer_name = deal.person_id.name;
                await util.createDocumentFromTemplate(settings.values.docusign_accid, req.body.template_id, settings.values.docusign_token, signer_email, signer_name);
                debug("Document sent for signing");
                res.send({
                    success: true
                });
            } else {
                throw new Error("Recipient does not have an email ID");
            }
        } else {
            throw new Error("Settings are not configured. Make sure you update them in the App Settings page");
        }
    } catch (error) {
        return util.getErrorResponse("Could not send document to the recipient", error, 500, res);
    }
});


module.exports = router;