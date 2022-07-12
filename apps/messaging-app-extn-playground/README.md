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

- Make a copy of the `.env.example` file and rename it to `.env`
- Fill the environment variables in the `.env` file based on the [tutorial](https://developers.pipedrive.com/tutorials).
- Use [`ngrok`](https://ngrok.com/) to create a tunnel to your app by using the `ngrok http 3000` command. If you change the port, make sure you change the port in the command accordingly.
- Set the value for the environment variable `PROJECT_DOMAIN`. This will be the ngrok domain (For instance : xxx.ngrok.io)
- Use the ngrok generated domain for callback url and in provider endpoints so that it can reach your app over the internet.

> NB! Delete the `sqlite` database that is created in the `data` folder if you are committing to a public repo as it contains information about users.

> You can troubleshoot your app by looking at the logs. This is how it looks once you run the app with .env filled and ngrok running.
> ![](https://user-images.githubusercontent.com/19341550/178484154-d06bd52e-190c-43a6-b08e-e93477e3c348.png)
