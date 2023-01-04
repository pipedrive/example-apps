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
const handler = async (req, res) => {
  try {
    log.info('Getting session details');
    const client = getAPIClient(req, res);
    let contact;

    log.info('Initializing client');
    const api = new PersonsApi(client);

    if (req.query.id && req.query.id !== 'undefined') {
      log.info(req.query.id, 'Getting contact based on ID');
      // Let's get the person by ID
      contact = await getContactById(api, req.query.id);
    } else if (req.query.number && req.query.number !== 'undefined') {
      log.info(req.query.number, 'Getting contact based on number search');
      // Let's get the person by the number
      // If the contact does not exist in Pipedrive, simply return the contact object
      contact = await getContactByNumber(api, req.query.number);
      if (!contact.existing) return res.status(200).json(contact);
    }
    log.info('Getting associated deals');
    // Now let's get the associated details if the contact exists in Pipedrive
    const relatedDealObj = await api.getPersonDeals(contact.id);
    const relatedDealsJson = relatedDealObj.data;
    log.info('Returning response');
    // Prepare the response and send
    const apiResponse = contact;
    apiResponse.relatedDeals = relatedDealsJson;

    res.status(200).json(apiResponse);
  } catch (error) {
    log.info('Failed get contact');
    log.error(error);
    res.status(500).json({ success: false, data: error });
  }
};

const getContactById = async (api, id) => {
  const contactObj = await api.getPerson(id);
  log.info('Contact details obtained based on id');
  const contact = contactObj.data;
  contact.number = contact.phone[0].value;
  contact.existing = true;
  return contact;
};

const getContactByNumber = async (api, number) => {
  const contactsObj = await api.searchPersons(number);
  const contacts = contactsObj.data;
  let contact;
  if (contacts.items.length === 0) {
    log.info('No matching contacts found');
    contact = {
      name: 'Unknown',
      number: number,
      existing: false,
    };
  } else {
    log.info('Matching contact found');
    contact = contacts.items[0].item;
    contact.number = contact.phones[0];
    contact.existing = true;
  }
  return contact;
};

export default handler;
