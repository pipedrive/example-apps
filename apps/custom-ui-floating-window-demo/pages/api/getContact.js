import { PersonsApi } from 'pipedrive';
import logger from '../../shared/logger';
import { getAPIClient } from '../../shared/oauth';
const log = logger('Get Contact API 📕');
/**
 * Get the current session
 * Obtain the person by ID / Number
 * Get associated deals of that person (if available)
 * Return the response
 */
export const handler = async (req, res) => {
  try {
    log.info('Getting session details');
    const client = getAPIClient(req, res);
    let contact;

    log.info('Initializing client');
    const api = new PersonsApi(client);

    if (req.query.id && req.query.id !== 'undefined') {
      log.info(req.query.id, 'Getting contact based on ID');
      // Let's get the person by ID
      let contactObj = await api.getPerson(req.query.id);
      log.info('Contact details obtained');
      contact = contactObj.data;
      contact.number = contact.phone[0].value;
      contact.existing = true;
    } else if (req.query.number && req.query.number !== 'undefined') {
      log.info(req.query.number, 'Getting contact based on number search');
      // Let's get the person by the number
      let contactsObj = await api.searchPersons(req.query.number);
      let contacts = contactsObj.data;
      if (contacts.items.length == 0) {
        log.info('No matching contacts found');
        contact = {
          name: 'Unknown',
          number: req.query.number,
          existing: false,
        };
        return res.status(200).json(contact);
      } else {
        log.info('Matching contact found');
        contact = contacts.items[0].item;
        contact.number = contact.phones[0];
        contact.existing = true;
      }
    }
    log.info('Getting associated deals');
    // Now let's get the associated details
    let relatedDealObj = await api.getPersonDeals(contact.id);
    let relatedDealsJson = relatedDealObj.data;
    log.info('Returning response');
    // Prepare the response
    let apiResponse = contact;
    apiResponse.relatedDeals = relatedDealsJson;

    // And, send it :)
    res.status(200).json(apiResponse);
  } catch (error) {
    log.info('Failed get contact');
    log.error(error);
    res.status(500).json({ success: false, data: error });
  }
};
