const VoiceResponse = require("twilio").twiml.VoiceResponse;
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const nameGenerator = require("./name_generator");
const config = require("./config");

var identity;
/**
 * Generates short-lived access tokens to authorize the SDK to perform voice calls
 * `identity` is very similar to an username. For simplicity sake, this is represented as `Caller Alias` in the UI
 */
exports.tokenGenerator = function tokenGenerator() {
    identity = nameGenerator();

    const accessToken = new AccessToken(
        config.accountSid,
        config.apiKey,
        config.apiSecret
    );
    accessToken.identity = identity;
    const grant = new VoiceGrant({
        outgoingApplicationSid: config.twimlAppSid,
        incomingAllow: true,
    });
    accessToken.addGrant(grant);

    // Include identity and token in a JSON response
    return {
        identity: identity,
        token: accessToken.toJwt(),
        phone_number: process.env.TWILIO_CALLER_ID
    };
};

/**
 * Instructs how to handle calls
 */
exports.voiceResponse = function voiceResponse(requestBody) {
    const toNumberOrClientName = requestBody.To;
    const callerId = config.callerId;
    let twiml = new VoiceResponse();

    // If the request to the /voice endpoint is TO your Twilio Number, 
    // then it is an incoming call towards your Twilio.Device.
    if (toNumberOrClientName == callerId) {
        let dial = twiml.dial();
        // This will connect the caller with your Twilio.Device/client 
        dial.client(identity);

    } else if (requestBody.To) {
        // This is an outgoing call

        // set the callerId
        let dial = twiml.dial({
            callerId
        });

        // Check if the 'To' parameter is a Phone Number or Client Name
        // in order to use the appropriate TwiML noun 
        const attr = isAValidPhoneNumber(toNumberOrClientName) ?
            "number" :
            "client";
        dial[attr]({}, toNumberOrClientName);
    } else {
        twiml.say("Thanks for calling Pipedrive!");
    }

    return twiml.toString();
};

/**
 * Checks if the given value is valid as phone number
 */
function isAValidPhoneNumber(number) {
    return /^[\d\+\-\(\) ]+$/.test(number);
}