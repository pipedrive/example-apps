# Todo example app

A simple todo app where you can manage list of items and mark them as done.

This example app covers following Pipedrive app capabilities:
* OAuth flow with Pipedrive
* Custom app surfaces
* Embedded actions

## Installation

Make sure to have at least nodejs version 14.

Install dependencies with command `npm install`

Use ngrok or some alternative tunneling service to get publicly accessible URL for port 3000.

```
ngrok http 3000 --host-header=localhost
```

1. Create an app in Pipedrive marketplace manager.
2. Create new deal details view panel and choose custom app surface option. For URL provide the ngrok URL. Choose a JWT secret for the surface.
3. Create new embedded action for deal details view. For URL provide the ngrok URL with route `/embedded-action`. Choose a JWT secret for the embedded action. Upload `embedded-action-schema.json` as the embedded action schema.
4. Add Callback URL which is ngrok URL with `/callback` route.
5. Save app. Open it again to retrieve client id and secret.
6. Open `config.js` and replace default values with your app specific values.
7. Start the server with command `npm run start`.
8. In marketplace manager preview your app and press the install button and go through OAuth flow.
9. Go to deal details view and the surface should load.
