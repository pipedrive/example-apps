const Router = require("express").Router;
const router = new Router();
const db = require("../data/connection");
const util = require("../util/helper");

const debug = require('debug')('app:ui');

// Renders the side panel page
router.get("/ui/panel", async (req, res) => {
    try {
        const queryParams = req.query;
        let context = {
            company_id: queryParams.companyId,
            item_id: queryParams.selectedIds,
            details: {}
        };
        const settings = await db.getSettings(context.company_id);
        if (settings.configured) {
            const {
                docusign_token,
                docusign_accid
            } = settings.values;
            let templates = await util.getDocuSignTemplates(docusign_accid, docusign_token);
            context.templates = templates.envelopeTemplates;
            debug("Rendering the Custom UI Panel");
            res.render("panel", context);
        } else {
            debug("Settings not configured");
            res.render("oops", context);
        }
    } catch (error) {
        return util.getErrorResponse("Could not render Custom UI panel", error, 500, res);
    }
});

// Renders the modal page
router.get("/ui/modal", async (req, res) => {
    try {
        const data = req.query.data;
        const context = JSON.parse(data);
        debug("Rendering the Custom UI Modal");
        res.render("modal", context.data);
    } catch (error) {
        return util.getErrorResponse("Could not render the Custom UI modal", error, 500, res);
    }
});

// Render the settings page
router.get("/ui/settings", async (req, res) => {
    try {
        const queryParams = req.query;
        let settings = await db.getSettings(queryParams.companyId);
        let context = {
            company_id: queryParams.companyId,
            item_id: queryParams.selectedIds,
            details: settings.values
        };
        debug("Rendering the Custom UI Settings page");
        res.render("settings", context);
    } catch (error) {
        return util.getErrorResponse("Could not render the settings page", error, 500, res);
    }
});

module.exports = router;