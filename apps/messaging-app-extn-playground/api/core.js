const Router = require("express").Router;
const util = require("./util.js");
const debug = util.debug;

const User = require("../db/user");
const Channel = require("../db/channel");

const knex = require("../db/connection");

const router = new Router();

// Render the playground page with all the necessary details
// Few steps require access_token and thus wont be shown in the start
router.get("/", async (req, res) => {
    let authStatus = false,
        tokenExpiresIn = { expired: true };
    let domain = await util.getAppDomain();
    if (req.user) {
        // We are checking for two things: 1. If user has authorized 2. If authorized token is valid
        tokenExpiresIn = util.getAccessTokenExpiry(req.user.expiry);
        if (!tokenExpiresIn.expired) {
            authStatus = true;
        }
    }

    try {
        let page_data = {
            authStatus,
            domain,
            manifest_data: JSON.stringify(util.generateManifest(domain), null, 4),
            messaging_channel_id_default: process.env.CHANNEL_ID,
            channel_details: await Channel.getAll(),
            tokenExpiresIn
        };
        res.render("steps", page_data);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});


// Create Channel for the app and write it to our database for later reference
router.post("/create_channel", async (req, res) => {
    try {
        debug("Creating a new channel");
        const {
            id,
            name,
            type
        } = req.body;
        const response = await util.createChannel(req.user.access_token, id, name, type);
        if (response.success) {
            const channel_details = response.data;
            Channel.add(channel_details);
            debug("Channel created successfully", channel_details);
            res.status(200).send(response);
        } else {
            debug("Channel creation failed", "Item creation failed");
            res.status(500).send({
                success: false,
                message: "Item creation failed"
            });
        }
    } catch (e) {
        debug("Channel creation failed", e)
        res.status(500).send({
            success: false,
            message: e.error || e
        });
    }
});

// Upon uninstallation, remove the user details
// Follow steps as described under https://pipedrive.readme.io/docs/app-uninstallation
router.delete("/auth/pipedrive/callback", async (req, res) => {
    debug("App is being uninstalled");
    const basicAuthHeader = Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    ).toString("base64");

    if (`Basic ${basicAuthHeader}` === req.get("authorization")) {
        await User.remove(req.body.user_id);
        res.status(200).send({
            success: true,
            message: "User removed"
        });
    } else {
        res.status(401).send({
            success: false,
            message: "Unauthorized"
        });
    }
});

// Clears the users and channels table
router.get('/clean_slate', async (req, res) => {
    debug("Clearning tables and resetting things")
    try {
        await knex('users').del();
        await knex('channels').del();
        res.render('reset', {})
    } catch (e) {
        res.status(500).send({
            success: false,
            message: e
        })
    }
});

module.exports = router;