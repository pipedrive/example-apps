import { getCookie } from "cookies-next";
import { CallLogsApi, CallLogObject } from "pipedrive";
import logger from "../../shared/logger";
import { initAPIClient } from "../../shared/oauth";
const log = logger("Call Logs API 📇");

export default async function handler(req, res) {
  try {
    log.info("Getting session details");
    const session = getCookie("session", { req, res });
    const d = JSON.parse(req.body);

    const client = initAPIClient({
      accessToken: JSON.parse(session).token,
    });

    log.info("Initializing client");
    const api = new CallLogsApi(client);

    log.info("Adding call log to deal based on the deal ID and other params");
    const calllog = await api.addCallLog(CallLogObject.constructFromObject(d));

    log.info("Call log successfully added");
    res.status(200).json(calllog);
  } catch (error) {
    log.info("Adding call log failed");
    log.error(error);
    res.status(500).json({ success: false, data: error });
  }
}
