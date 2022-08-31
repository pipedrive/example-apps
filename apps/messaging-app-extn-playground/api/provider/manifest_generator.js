const Router = require("express").Router;
const router = new Router();
const util = require("../util");
const debug = util.debug;
// Generates the manifest.json file required for Messaging App Extension Apps.
// Make sure you select the messaging scope while creating the Pipedrive OAuth app
// More : https://pipedrive.readme.io/docs/implementing-messaging-app-extension#template-for-messaging-manifest
router.get("/manifest.json", async (req, res) => {
  debug("Generating manifest.json file content");
  try {
    const domain = await util.getAppDomain();
    const manifestData = await util.generateManifest(domain);
    res.send(manifestData);
    debug("Successfully rendered manifest.json data");
  } catch (e) {
    debug("Error while generating manifest.json", e);
    res.status(500).send({ success: false, message: e });
  }
});

module.exports = router;
