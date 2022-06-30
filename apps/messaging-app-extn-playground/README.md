# Messaging App Extension Playground 🕹

The playground app is intended for getting started and experimenting with the key aspects before starting to build production-ready applications.

![](https://user-images.githubusercontent.com/19341550/176623698-0e114f30-c1bc-4709-bb01-e8a40faa14a9.gif)

The app lets you:

- Authorize with Pipedrive and obtain access tokens.
- Generate the provider manifest file dynamically and mock provider endpoints.
- Create messaging channel in Pipedrive and infer the response.
- Integrate with WhatsApp via the Cloud API and Pipedrive Messaging Inbox via the Channel API
- Troubleshoot via debug logs

![](https://cdn.glitch.global/bc471203-097e-4130-886b-48ce20145aa7/0176059b-e29f-465e-af31-006c5f7bfd19.image.png?v=1656575221241)

If you are running this app _locally_, you need to make sure of the following things:

- Modify the path in `db/connection.js` file. Point it to a valid path that exists.
- Use `ngrok` to expose the localhost. Without doing that, the provider endpoints will not be accessible to Pipedrive and WhatsApp.
- Create an environment variable `PROJECT_DOMAIN` and add the ngrok domain (without the protocol) as its value.
- Use the ngrok generated domain for callback url and in provider endpoints so that it can reach your app over the Internet.
