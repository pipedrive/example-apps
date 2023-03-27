import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'Socket.IO-client';

import { useAppContext } from '../shared/context';
import logger from '../shared/logger';
import { initalizeSession } from '../shared/oauth';
import { getCustomUISDK } from '../shared/custom_ui_sdk';
import { handleSocketCommunication } from '../shared/socket';

import ContactList from '../components/ContactList';
import Dialer from '../components/Dialer';
import FollowUp from '../components/FollowUp';
import Login from '../components/Login';

const log = logger('Core ✨');

export const getServerSideProps = async ({ req, res, query }) => {
  log.info('Checking session details based on query parameters');
  const session = await initalizeSession(req, res, query.userId);
  return session.auth
    ? { props: { auth: true, session } }
    : { props: { auth: false } };
};

const Home = ({ auth, session }) => {
  const router = useRouter();
  const context = useAppContext();
  const socket = io();

  const [pageVisibility, setPageVisibilityState] = useState({ state: 'hidden' });
  const [customSdk, setCustomSdk] = useState();

  useEffect(() => {
    (async () => {
      const sdk = await getCustomUISDK();

      setCustomSdk(sdk);

      const stopReceivingPageState = sdk.listen('page_visibility_state', ({ data }) => {
        console.log('DATA => ', data.state);
        setPageVisibilityState(data);
      });
    })();
  }, []);

  useEffect(() => {
    if (auth) {
      // Update the context variables once the session is initialized
      log.info('Setting user ID to ', router.query.userId);
      context.setUser(session);
      // Initialize Custom UI SDK and Socket communications
      (async () => {
        const sdk = await getCustomUISDK();
        await fetch('/api/socket', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        handleSocketCommunication(socket, context, sdk);
      })();
    }
  }, [router]);

  // Not logged-in? Login again
  if (auth === false) {
    return <Login />;
  }

  switch (context.callerState) {
    case 'listening': {
      return <ContactList {...context } />;
    }
    case 'ringing':
    case 'connected': {
      const props = { ...context, pageVisibility, customSdk };
     
      return <Dialer {...props} />;
    }
    case 'disconnected': {
      return <FollowUp {...context} />;
    }
    default:
      return <ContactList {...context} />;
  }
};

export default Home;
