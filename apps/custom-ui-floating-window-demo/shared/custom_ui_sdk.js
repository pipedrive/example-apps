import AppExtensionsSDK, {
  Command,
  Modal,
  View,
} from '@pipedrive/app-extensions-sdk';
import logger from './logger';

const log = logger('Custom UI SDK');
// Initialize SDK and set height
export async function initializeSDK() {
  try {
    log.info('Initialized SDK');
    return await new AppExtensionsSDK().initialize({ size: { height: 550 } });
  } catch (e) {
    log.error('Error during SDK initialization', e);
  }
}

export async function hideFloatingWindow(sdk) {
  log.info('Hiding floating window');
  await sdk.execute(Command.HIDE_FLOATING_WINDOW, {});
}

export async function showFloatingWindow(sdk) {
  log.info('Showing floating window');
  await sdk.execute(Command.SHOW_FLOATING_WINDOW, {});
}

export async function openActivityModal(sdk) {
  log.info('Opening activity modal');
  // const { status, id } = await sdk.execute(Command.OPEN_MODAL, {
  //   type: Modal.ACTIVITY,
  // });
}

export async function redirectToContact(sdk, id) {
  log.info(`Redirecting to ${id}`);
  await sdk.execute(Command.REDIRECT_TO, { view: View.CONTACTS, id });
}

export async function setNotification(sdk, number) {
  log.info(`Updating notification count to ${number}`);
  await sdk.execute(Command.SET_NOTIFICATION, {
    number,
  });
}
