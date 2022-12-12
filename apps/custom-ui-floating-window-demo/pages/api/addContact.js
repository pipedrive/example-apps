import { getCookie } from 'cookies-next';
import {
  PersonsApi,
  NewPerson,
  BasePersonItemPhone,
  NotesApi,
  AddNoteRequest,
} from 'pipedrive';
import logger from '../../shared/logger';
import { initAPIClient } from '../../shared/oauth';
const log = logger('Add Contact API ➕');

export default async function handler(req, res) {
  try {
    log.info('Getting session details');
    const session = getCookie('session', { req, res });
    const d = JSON.parse(req.body);

    const client = initAPIClient({
      accessToken: JSON.parse(session).token,
    });

    log.info('Initializing client');
    const api = new PersonsApi(client);

    // Create contact
    log.info('Creating contact');
    let person = await api.addPerson(
      NewPerson.constructFromObject({
        name: d.name,
        phone: [
          BasePersonItemPhone.constructFromObject({
            primary: true,
            label: 'work',
            value: d.number,
          }),
        ],
      })
    );
    log.info('Contact successfully created');

    // If creation was successful, proceed to add notes
    if (d.notes.length) {
      log.info('Proceeding to create notes');
      const notesApi = new NotesApi(client);
      await notesApi.addNote(
        AddNoteRequest.constructFromObject({
          personId: person.data.id,
          content: d.notes,
        })
      );
      log.info('Note successfully added');
    } else {
      log.info('Skipping note creation since the body param is empty');
    }

    res.status(200).json(person);
  } catch (error) {
    log.info('Contact creation failed');
    log.error(error);
    res.status(500).json({ success: false, data: error });
  }
}
