/**  
 * A good practice is to store these string values as system environment 
 * variables, and load them from there as we are doing below. Alternately, 
 * you could hard code these values here as strings.
 * */

const dotenv = require("dotenv");
const cfg = {};

if (process.env.NODE_ENV !== "test") {
    dotenv.config({
        path: __dirname + "/../../.env"
    });
} else {
    dotenv.config({
        path: __dirname + "/../../.env.example",
        silent: true
    });
}

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// Your Pipedrive App OAuth Client credentials
cfg.clientID = process.env.PIPEDRIVE_CLIENT_ID;
cfg.clientSecret = process.env.PIPEDRIVE_CLIENT_SECRET;
cfg.callbackURL = process.env.PIPEDRIVE_CALLBACK_URL;

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;

cfg.twimlAppSid = process.env.TWILIO_TWIML_APP_SID;
cfg.callerId = process.env.TWILIO_CALLER_ID;

cfg.apiKey = process.env.TWILIO_API_KEY;
cfg.apiSecret = process.env.TWILIO_API_SECRET;

// Export configuration object
module.exports = cfg;