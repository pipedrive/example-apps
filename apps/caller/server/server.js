const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Routers contain the relevant endpoints and associated logic
const twilio_router = require("./routers/twilio");
const pipedrive_router = require("./routers/pipedrive");

// Create an Express webapp
// Add Pipedrive OAuth callback & API routes
const app = express();
app.use(pipedrive_router);

// Serve frontend assets from `public` directory
// Add Twilio routes to handle calls
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(twilio_router);

// Create http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, function () {
  // If the app is running in Glitch, you can see the preview URL using PROJECT_DOMAIN environment variable
  console.log(`🟢 App has started.`);
  if (process.env.PROJECT_DOMAIN)
    console.log(`🔗 Live URL: https://${process.env.PROJECT_DOMAIN}.glitch.me`);
  // If not, you can use the `localhost` URL
  else
    console.log(`🔗 App URL: http://localhost:${port}`);
});