const Router = require("express").Router;
const router = new Router();
const api = require('../utils/pipedrive_handler');
const config = require('../utils/config');
const User = require('../db/user');
// Create a table to store details pertaining to authorized users
User.createTable();

const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

// Perform authorization, retrieve user details upon successful authorization and persist them.
passport.use(
    'pipedrive',
    new OAuth2Strategy({
        authorizationURL: 'https://oauth.pipedrive.com/oauth/authorize',
        tokenURL: 'https://oauth.pipedrive.com/oauth/token',
        clientID: config.clientID || '<YOUR_CLIENT_ID>',
        clientSecret: config.clientSecret || '<YOUR_CLIENT_SECRET>',
        callbackURL: config.callbackURL || '<YOUR_CALLBACK_URL>'
    }, async (accessToken, refreshToken, profile, done) => {
        const userInfo = await api.getUser(accessToken);
        const user = await User.add(
            userInfo.data.name,
            accessToken,
            refreshToken
        );

        done(null, {
            user
        });
    })
);

router.use(passport.initialize());
router.use(async (req, res, next) => {
    req.user = await User.getById(1);
    next();
});

// Authentication middlewares
router.get('/auth/pipedrive', passport.authenticate('pipedrive'));
router.get('/auth/pipedrive/callback', passport.authenticate('pipedrive', {
    session: false,
    failureRedirect: '/',
    successRedirect: '/'
}));

// Redirect to Pipedrive OAuth if users lack authorization
router.use((req, res, next) => {
    if (req.user.length < 1) {
        return res.redirect('/auth/pipedrive');
    } else {
        next();
    }
});

module.exports = router;