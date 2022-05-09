const Router = require("express").Router;
const {
    tokenGenerator,
    voiceResponse
} = require("../utils/twilio_handler");

const router = new Router();

// Token generation and authentication with Twilio
router.get("/token", (req, res) => {
    res.send(tokenGenerator());
});

// Handle voice calls dynamically with this endpoint
router.post("/voice", (req, res) => {
    res.set("Content-Type", "text/xml");
    res.send(voiceResponse(req.body));
});

module.exports = router;