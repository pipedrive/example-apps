const express = require("express");
const path = require("path");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;

const util = require("./api/util");
const debug = util.debug;

const User = require("./db/user");
const Channel = require("./db/channel");
const bodyParser = require("body-parser");

// Core API routes
const coreApi = require("./api/core");

// Provider and Manifest related endpoints
const manifestRouter = require("./api/provider/manifest_generator");
const providerRouter = require("./api/provider/mock_response_generator");

// Webhook Handlers
const pdMessageHandler = require("./webhooks/pipedrive_handler");
const whatsappMessageHandler = require("./webhooks/whatsapp_handler");

debug("Loading environment variables");
require('dotenv').config()

debug("Starting the app");
User.createTable();
Channel.createTable();

const app = express();
process.env.PORT = 3000;

debug("Configuring Passport for OAuth2");
passport.use(
  "pipedrive",
  new OAuth2Strategy(
    {
      authorizationURL: "https://oauth.pipedrive.com/oauth/authorize",
      tokenURL: "https://oauth.pipedrive.com/oauth/token",
      clientID: process.env.CLIENT_ID || "<CLIENT_ID>",
      clientSecret: process.env.CLIENT_SECRET || "<CLIENT_SECRET>",
      callbackURL: process.env.CALLBACK_URL || "<CALLBACK_URL>",
    },
    async (accessToken, refreshToken, profile, done) => {
      const userInfo = await util.getUser(accessToken);
      const user = await User.add(userInfo.data.id, accessToken, refreshToken);
      done(null, { user });
    }
  )
);
debug("Rendering static content with handlebars");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

// for the sake of demo, let's use the token of first authenticated user
app.use(async (req, res, next) => {
  req.user = await User.getCurrent();
  debug(`${req.method} : ${req.originalUrl}`);
  next();
});

app.get("/auth/pipedrive", passport.authenticate("pipedrive"));
app.get(
  "/auth/pipedrive/callback",
  passport.authenticate("pipedrive", {
    session: false,
    failureRedirect: "/",
    successRedirect: "/",
  })
);

// Core API
debug('Loading API routes');
app.use(coreApi);

// API pertaining to webhooks that handle incoming messages from either Pipedrive / Provider.
app.use(pdMessageHandler);
app.use(whatsappMessageHandler);
app.use(providerRouter);
app.use(manifestRouter);

// Let's start the server 💪
app.listen(process.env.PORT, async () => {
  debug("Figuring out the app's domain");
  const domain = await util.getAppDomain(process.env.PORT);
  console.log(`🟢 App has started.`);
  console.log(`🔗 Live URL: ${domain}/`);
  console.log(`🔗 CallBack URL: ${domain}/auth/pipedrive/callback`);
  console.log(`🔗 Manifest URL: ${domain}/manifest.json`);
});