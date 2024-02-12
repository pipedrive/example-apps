# Todo example app

A simple todo app where you can manage list of items and mark them as done.

This example app covers following Pipedrive app capabilities:
* OAuth flow with Pipedrive
* Custom UI extensions
* Embedded actions
* Pipedrive API client

## Installation

Recommended Node.js version is 16.

Install dependencies with command `npm install`

Use ngrok or some alternative tunneling service to get publicly accessible HTTPS URL for port 3000.

```
ngrok http 3000 --host-header=localhost
```

1. Create an app in Pipedrive Developer Hub.
2. Add Callback URL which is ngrok URL with `/callback` route.
3. Under "App extensions" section create: \
   3.1 "Custom panel" for deal details view. For URL provide the ngrok URL. Choose a JWT secret for the extension. \
   3.2 "JSON modal" for deal details view. For URL provide the ngrok URL with route `/embedded-action`. Choose a JWT secret for the embedded action. Upload `embedded-action-schema.json` as the embedded action schema.
4. Save the app. Retrieve client id and secret from the "OAuth & access scopes" section.
5. Open `config.js` and replace default values with your app specific values.
6. Start the server with command `npm run start`.
7. In the Developer Hub preview your app and press the "Install & test" button and go through OAuth flow.
8. Go to deal details view and the Custom UI Extensions should load.
