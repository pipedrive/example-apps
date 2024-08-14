const express = require('express');
const path = require('path');
const passport = require('passport');
const { Strategy } = require('passport-oauth2');

const api = require('./api');
const config = require('./config');
const User = require('./db/user');

User.createTable();

const app = express();

passport.use(
	'pipedrive',
	new Strategy({
			authorizationURL: 'https://oauth.pipedrive.com/oauth/authorize',
			tokenURL: 'https://oauth.pipedrive.com/oauth/token',
			clientID: config.clientID || '',
			clientSecret: config.clientSecret || '',
			callbackURL: config.callbackURL || ''
		}, async (accessToken, refreshToken, profile, done) => {
				const userInfo = await api.getUser(accessToken);
				const user = await User.add(
					userInfo.data.name,
					accessToken,
					refreshToken
				);
    
				done(null, user);
		}
	)
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(async (req, res, next) => {
		req.user = await User.getById(1);
		next();
});

// Remove this section on Glitch

app.get('/auth/pipedrive', passport.authenticate('pipedrive'));
app.get('/auth/pipedrive/callback', passport.authenticate('pipedrive', {
	session: false,
	failureRedirect: '/',
	successRedirect: '/'
}));
app.get('/', async (req, res) => {
	if (req.user.length < 1) {
		return res.redirect('/auth/pipedrive');
	}

	try {
		const deals = await api.getDeals(req.user[0].access_token);

		res.render('deals', {
			name: req.user[0].username,
			deals: deals.data
		});
	} catch (error) {
		console.log(error);

		return res.send('Failed to get deals');
	}
});
app.get('/deals/:id', async (req, res) => {
	const randomBoolean = Math.random() >= 0.5;
	const outcome = randomBoolean === true ? 'won' : 'lost';

	try {
		await api.updateDeal(req.params.id, outcome, req.user[0].access_token);

		res.render('outcome', { outcome });
	} catch (error) {
		console.log(error);

		return res.send('Failed to update the deal');
	}
});

// End of section to remove on Glitch

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));

console.log(`🟢 App has started. \n🔗 Live URL: https://${process.env.PROJECT_DOMAIN}.glitch.me`);
