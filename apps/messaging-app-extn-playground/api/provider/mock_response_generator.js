const Router = require("express").Router;
const router = new Router();
const {
    faker
} = require("@faker-js/faker");
const debug = require("../util").debug;

// Generates mock responses for provider endpoints
// We are using `faker` to generate dummmy data
// For `getConversations` provider endpoint
router.get("/channels/:providerChannelId/conversations", (req, res) => {
    debug("Serving mock data for `getConversations`");
    const fakeResponse = {
        success: true,
        data: [],
        additional_data: {
            after: "c-next",
        },
    };
    res.send(fakeResponse);
});

// For `getConversationById` provider endpoint
router.get(
    "/channels/:providerChannelId/conversations/:sourceConversationId",
    (req, res) => {
        debug("Serving mock data for `getConversationById`");
        const fakeResponse = {
            success: true,
            data: {
                id: `${req.params.sourceConversationId}`,
                link: `https://example.com/${req.params.providerChannelId}/${req.params.sourceConversationId}`,
                status: "open",
                seen: false,
                next_messages_cursor: null, // To avoid fetching the next set of messages
                messages: [],
                participants: [{
                    id: "sender-pd-1",
                    name: `Pipedriver ${faker.name.findName()}`,
                    role: "source_user",
                    avatar_url: `https://www.gravatar.com/avatar/${faker.random.alpha(20)}?d=robohash`,
                    fetch_avatar: true,
                    avatar_expires: false,
                },
                {
                    id: `sender-wa-${req.params.sourceConversationId.split('-')[1]}`,
                    name: `WhatsApper ${faker.name.findName()}`,
                    role: "end_user",
                    avatar_url: `https://www.gravatar.com/avatar/${faker.random.alpha(20)}?d=robohash`,
                    fetch_avatar: true,
                    avatar_expires: false,
                },
                ],
            },
            additional_data: {
                after: "c-next",
            },
        };
        res.send(fakeResponse);
    }
);

// For `getMessageById` provider endpoint
router.get(
    "/channels/:providerChannelId/messages/:sourceMessageId",
    (req, res) => {
        debug("Serving mock data for `getMessageById`");
        const { sourceMessageId } = req.params;
        const sender = sourceMessageId.includes("wa") ?
            `sender-wa-dummynumber` :
            "sender-pd-1";
        const fakeResponse = {
            id: `${req.params.sourceMessageId}`,
            status: "sent",
            created_at: new Date(Date.now()).toISOString(),
            message: faker.hacker.phrase(),
            sender_id: sender,
            reply_by: new Date(Date.now() + 3.156e+10).toISOString(), // an year from now
            attachments: [],
        };
        res.send(fakeResponse);
    }
);

// For `getMessageById` provider endpoint
router.get(
    "/channels/:providerChannelId/conversations/:sourceConversationId/messages/:sourceMessageId",
    (req, res) => {
        debug("Serving mock data for `getMessageById`");
        let sender = req.params.sourceMessageId;
        sender = sender.includes("wa") ?
            `sender-wa-dummynumber` :
            "sender-pd-1";
        const fakeResponse = {
            id: `${req.params.sourceMessageId}`,
            status: "sent",
            created_at: new Date(Date.now()).toISOString(),
            message: faker.hacker.phrase(),
            sender_id: sender,
            reply_by: new Date(Date.now() + 3.156e+10).toISOString(), // an year from now
            attachments: [],
        };
        res.send(fakeResponse);
    }
);

// For `getSenderById` provider endpoint
router.get("/channels/:providerChannelId/senders/:senderId", (req, res) => {
    debug("Serving mock data for `getSenderById`");
    const fakeResponse = {
        success: true,
        data: {
            id: `${req.params.senderId}`,
            name: faker.name.findName(),
            avatar_url: `https://www.gravatar.com/avatar/${faker.random.alpha(20)}?d=robohash`,
        },
    };

    res.send(fakeResponse);
});

// For `getTemplates` provider endpoint
router.get("/channels/:providerChannelId/templates", (req, res) => {
    debug("Serving mock data for `getTemplates`");
    const fakeResponse = {
        success: true,
        data: {
            templates: [{
                id: "template-1",
                name: "Say Hello",
                content: "Hello there!",
                language: "en_US",
            },
            {
                id: "template-2",
                name: "Offer Discount",
                content: "Hey {{1}}, You get 50% discount. Use this code `CHEWBACCA`",
                language: "en_US",
            },
            ],
        },
    };
    res.send(fakeResponse);
});

module.exports = router;