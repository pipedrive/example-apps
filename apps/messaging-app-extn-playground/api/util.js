process.env.DEBUG = "app";

const axios = require("axios");
const debug = require('debug')('app');
debug.log = console.info.bind(console);

async function getUser(accessToken) {
    debug("Retrieving user details using the access token");
    const response = await axios.get("https://api.pipedrive.com/v1/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
}

async function createChannel(accessToken, id, name, type) {
    const response = await axios.post("https://api.pipedrive.com/v1/channels", {
        name: name,
        provider_channel_id: id,
        avatar_url: 'https://robohash.org/mxtouwlpxqjqtxiltdui?set=set1&bgset=&size=48x48',
        provider_type: type
    }, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    debug("Channel created!");
    return response.data;
}

async function sendMessageToWA(msg, recipientId) {
    debug("Sending a whatsapp message based on data received from Pipedrive");
    const response = await axios.post(
        `https://graph.facebook.com/v13.0/${process.env.WA_PHONE_NUMBER_ID}/messages`,
        {
            messaging_product: "whatsapp",
            to: recipientId.split('wa-')[1],
            type: "text",
            text: {
                preview_url: true,
                body: msg,
            },
        },
        {
            headers: { Authorization: `Bearer ${process.env.WA_TOKEN}` }
        }
    );
    debug("Message sent to WhatsApp from Pipedrive");
    return response.data;
}

async function sendMessageToPD(accessToken, from, msg, time) {
    debug("Sending a Pipedrive Inbox message based on data from WhatsApp chat:", msg);
    const response = await axios.post("https://api.pipedrive.com/v1/channels/messages/receive", {
        id: "msg-wa-" + Date.now(),
        channel_id: process.env.CHANNEL_ID,
        conversation_id: `conversation-${from}`,
        sender_id: `sender-wa-${from}`,
        message: msg,
        status: "sent",
        created_at: new Date(parseInt(time) * 1000).toISOString().replace("T", " ").substring(0, 16),
        attachments: [],
    }, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    debug("Message sent to Pipedrive from WhatsApp");
    return response.data;
}

function getAppDomain(port = 3000) {
    let domain;
    if (process.env.PROJECT_DOMAIN) {
        domain = `https://${process.env.PROJECT_DOMAIN}`;
    } else {
        domain = `http://localhost:${port}`;
    }
    return domain;
}

function generateManifest(domain) {
    return {
        version: "v202101",
        endpoints: {
            getConversations: `${domain}/channels/:providerChannelId/conversations`,
            getConversationById: `${domain}/channels/:providerChannelId/conversations/:sourceConversationId`,
            postMessage: `${domain}/channels/:providerChannelId/messages`,
            getSenderById: `${domain}/channels/:providerChannelId/senders/:senderId`,
            deleteChannelById: `${domain}/channels/:providerChannelId`,
            getTemplates: `${domain}/channels/:providerChannelId/templates`,
            getMessageById: `${domain}/channels/:providerChannelId/conversations/:sourceConversationId/messages/:sourceMessageId`,
        },
    };
}

function getAccessTokenExpiry(expiryTs) {
    const remainingMinutes = parseInt((parseInt(expiryTs) - parseInt(Date.now())) / (1000 * 60));
    return {
        expired: (remainingMinutes <= 0),
        remaining_minutes: remainingMinutes,
    }
}

module.exports = {
    debug,
    getUser,
    getAppDomain,
    getAccessTokenExpiry,
    generateManifest,
    createChannel,
    sendMessageToWA,
    sendMessageToPD
};
