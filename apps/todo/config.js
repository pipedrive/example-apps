module.exports = {
    clientId: 'clientId', // Your Pipedrive App OAuth 2 Client ID
    clientSecret: 'clientSecret', // Your Pipedrive App OAuth 2 Client Secret
    redirectUri: 'https://localhost:3000/callback', // Your Pipedrive App OAuth 2 Redirection endpoint or Callback Uri
    surfaceJwt: 'surfaceJWTSecret', // The JWT you have to set in Pipedrive Marketplace Manager to check security of Surface request
    embeddedActionJwt: 'embeddedActionJWTSecret', // The JWT you have to set in Pipedrive Marketplace Manager to check security of Embedded action request
}
