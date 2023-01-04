import {
  getCustomUISDK,
  openActivityModal,
  redirectToContact,
} from '../../shared/custom_ui_sdk';
import logger from '../../shared/logger';
const log = logger('FollowUp');

const FollowUpActionButtons = (props) => {
  // Invokes the Activity Modal
  const invokeActivityModal = async () => {
    log.info('Invoking activity dialog...');
    const sdk = await getCustomUISDK();
    openActivityModal(sdk);
  };
  // Navigates to the newly created contact in Pipedrive
  const goToContact = async () => {
    log.info('Navigating to the contact based on the contact ID');
    const sdk = await getCustomUISDK();
    redirectToContact(sdk, props.callerDetails.id);
  };
  // Navigates to the dialer
  const goToDialer = async () => {
    log.info('Going back to the dialer by changing the state');
    props.setCallerState('listening');
  };
  // If a contact is already existing, allow follow-up activity creation. Else allow saving it as new contact
  if (props.callerDetails.existing)
    return (
      <>
        <button
          type="button"
          className="btn btn-link w-100"
          onClick={invokeActivityModal}
        >
          Create a follow-up activity
        </button>
        <button
          type="button"
          className="btn btn-link w-100"
          onClick={goToDialer}
        >
          Go to dialer
        </button>
      </>
    );
  else
    return (
      <>
        <button
          type="button"
          className="btn btn-link w-100"
          onClick={goToContact}
        >
          View Contact
        </button>
        <button
          type="button"
          className="btn btn-link w-100 m-1"
          onClick={goToDialer}
        >
          Go to dialer
        </button>
      </>
    );
};

export default FollowUpActionButtons;
