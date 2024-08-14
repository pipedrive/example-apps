# Sample App for Pipedrive Marketplace

A very basic example of how to:

- Authorize with OAuth using [passportjs](http://www.passportjs.org/).
- Get all open deals from Pipedrive.
- Mark selected deal randomly as won or lost.

## Installation and usage on Glitch

Follow the instructions in the [Tutorial](https://developers.pipedrive.com/tutorials/build-your-first-pipedrive-hello-world-app?) to get started.

## Local Installation
- Create a test app in [Developer Hub](https://app.pipedrive.com/developer-hub) with the following callback URL: http://localhost:3000/auth/pipedrive/callback
- Run npm install
- Rename config.example.js to config.js and edit the clientID and clientSecret values
- Run `npm run dev` and open http://localhost:3000/
