import { CallLogsApi, CallLogObject } from 'pipedrive';
import logger from '../../shared/logger';
import { getAPIClient } from '../../shared/oauth';
const log = logger('Call Logs API 📇');

const handler = async (req, res) => {
  try {
    log.info('Getting session details');
    const d = req.body;
    const client = getAPIClient(req, res);

    log.info('Initializing client');
    const api = new CallLogsApi(client);

    log.info('Adding call log to deal based on the deal ID and other params');
    const calllog = await api.addCallLog(CallLogObject.constructFromObject(d));

    log.info('Call log successfully added');
    res.status(200).json(calllog);
  } catch (error) {
    log.info('Adding call log failed');
    log.error(error);
    res.status(500).json({ success: false, data: error });
  }
};
export default handler;
