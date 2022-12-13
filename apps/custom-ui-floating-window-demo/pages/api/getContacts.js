import { PersonsApi } from 'pipedrive';
import logger from '../../shared/logger';
import { getAPIClient } from '../../shared/oauth';
const log = logger('Get Contacts API 📚');
/**
 * Gets a list of contacts in Pipedrive for the ContactList page
 */
const handler = async (req, res) => {
  try {
    log.info('Getting session details');
    const client = getAPIClient(req, res);
    log.info('Initializing client');
    const api = new PersonsApi(client);

    log.info('Getting all persons');
    const contactObj = await api.getPersons();

    // Filter only those that have phone number
    log.info('Filtering persons by phone');
    const contacts = contactObj.data
      .filter((person) => {
        return person.phone[0].value.length > 0;
      })
      .map((person) => {
        return {
          contactId: person.id,
          contactName: person.name,
          contactNumber: person.phone[0].value,
          direction: 'out',
        };
      });
    log.info('Returning response');
    res.status(200).json(contacts);
  } catch (error) {
    log.info('Failed getting contacts');
    log.error(error);
    res.status(500).json({ success: false, data: error });
  }
};

export default handler;
