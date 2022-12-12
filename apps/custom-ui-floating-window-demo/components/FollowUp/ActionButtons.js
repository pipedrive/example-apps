import {
  initializeSDK,
  openActivityModal,
  redirectToContact,
} from '../../shared/custom_ui_sdk';
import logger from '../../shared/logger';
const log = logger('FollowUp');

const FollowUpActionButtons = (props) => {
  const invokeActivityModal = async () => {
    log.info('Invoking activity dialog...');
    const sdk = await initializeSDK();
    openActivityModal(sdk);
  };
  const goToContact = async () => {
    log.info('Navigating to the contact based on the contact ID');
    const sdk = await initializeSDK();
    redirectToContact(sdk, props.callerDetails.id);
  };

  const goToDialer = async () => {
    log.info('Going back to the dialer by changing the state');
    props.setCallerState('listening');
  };

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
