import { getCookie, setCookie } from 'cookies-next';
import { ApiClient, UsersApi } from 'pipedrive';
import db from './db';
import logger from './logger';
const log = logger('OAuth 🔒');

// Initialize the API client
export const initAPIClient = ({ accessToken = '', refreshToken = '' }) => {
  const client = new ApiClient();
  let oAuth2 = client.authentications.oauth2;

  // Set the Client Credentials based on the Pipedrive App details
  oAuth2.clientId = process.env.CLIENT_ID;
  oAuth2.clientSecret = process.env.CLIENT_SECRET;
  oAuth2.redirectUri = process.env.REDIRECT_URL;
  if (accessToken) oAuth2.accessToken = accessToken;
  if (refreshToken) oAuth2.refreshToken = refreshToken;

  return client;
};

// Gets the API client based on session cookies
export const getAPIClient = (req, res) => {
  const session = getCookie('session', { req, res });
  return initAPIClient({
    accessToken: JSON.parse(session).token,
  });
};

// Generate the authorization URL for the 1st step
export const getAuthorizationUrl = (client) => {
  const authUrl = client.buildAuthorizationUrl();
  log.info('Authorization URL generated');
  return authUrl;
};

// Get the currently authorized user details
export const getLoggedInUser = async (client) => {
  const api = new UsersApi(client);
  const data = await api.getCurrentUser();
  log.info('Currently logged-in user details obtained');
  return data;
};

// Update Access and Refresh tokens
export const updateTokens = (client, token) => {
  log.info('Updating access + refresh token details');
  const oAuth2 = client.authentications.oauth2;
  oAuth2.accessToken = token.access_token;
  oAuth2.refreshToken = token.refresh_token;
};

// Get Session Details
export const initalizeSession = async (req, res, userId) => {
  try {
    // 1.1 Check if the session cookie is already set
    log.info(`Checking if a session cookie is set for ${userId}`);
    let session = getCookie('session', { req, res });

    // 1.2. If the session is not set, get the user ID value from the query params
    if (!session) {
      log.info(
        'Session cookie is not found. Checking the database for OAuth details'
      );
      let account = await db.user.findUnique({
        where: {
          accountId: String(userId),
        },
      });
      // 1.3. If no entry exists in DB, the user hasn't even authorized once
      if (!account) {
        log.info('No matching account found. You need to authorize the app 🔑');
        return { auth: false };
      } else if (Date.now() > parseInt(account.expiresAt)) {
        log.info('Account details found. Access token has expired');
        const client = initAPIClient(account);
        const refreshed = await client.refreshToken();
        log.info('Token successfully refreshed');
        await db.user.update({
          where: {
            accountId: userId,
          },
          data: {
            accessToken: refreshed.access_token,
            refreshToken: refreshed.refresh_token,
            expiresAt: String(Date.now() + 59 * 60 * 1000),
          },
        });
        log.info('Database updated. Session cookie set 🍪');
        return setSessionCookie(
          true,
          account.accountId,
          account.name,
          refreshed.access_token,
          String(Date.now() + 59 * 60 * 1000),
          req,
          res
        );
      } else {
        log.info('Access token is valid. Session cookie set 🍪');
        // 1.5. Return this value to the app
        return setSessionCookie(
          true,
          account.accountId,
          account.name,
          account.accessToken,
          String(Date.now() + 59 * 60 * 1000),
          req,
          res
        );
      }
    } else {
      // 2. Simply return the existing session details :)
      log.info('Session cookie found 🍪');
      return JSON.parse(session);
    }
  } catch (error) {
    log.error("Couldn't create session :[");
    log.error(error);
  }
};

// Set cookies
const setSessionCookie = (auth, id, name, token, expiry, req, res) => {
  const newSession = {
    auth,
    id,
    name,
    token,
  };

  const cookieParams = {
    maxAge: Math.round((parseInt(expiry) - Date.now()) / 1000),
    sameSite: 'none',
    secure: true,
    req,
    res,
  };
  // 1.4. Set the cookie
  setCookie('session', JSON.stringify(newSession), cookieParams);

  return newSession;
};
