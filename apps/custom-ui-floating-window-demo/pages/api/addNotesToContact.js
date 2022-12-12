import { getCookie } from 'cookies-next';
import { NotesApi, AddNoteRequest } from 'pipedrive';
import logger from '../../shared/logger';
import { initAPIClient } from '../../shared/oauth';
const log = logger('Add Notes API 📝');

export default async function handler(req, res) {
  try {
    log.info('Getting session details');
    const session = getCookie('session', { req, res });
    const d = req.body;

    const client = initAPIClient({
      accessToken: JSON.parse(session).token,
    });

    log.info('Initializing client');
    const api = new NotesApi(client);

    log.info('Adding notes to contact based on the ID');
    const note = await api.addNote(
      AddNoteRequest.constructFromObject({
        personId: d.id,
        content: d.notes,
      })
    );
    log.info('Note successfully added');

    res.status(200).json(note);
  } catch (error) {
    log.info('Adding notes failed');
    log.error(error);
    res.status(500).json({ success: false, data: error });
  }
}
