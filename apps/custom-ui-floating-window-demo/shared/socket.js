import logger from './logger';
const log = logger('socket');

export const handleSocketCommunication = (socket, props, sdk) => {
  if (socket) {
    socket.on('connect', () => {
      log.info('Client connected.');
    });

    socket.on('OUTBOUND_CALL', (...args) => {
      log.info('Receiving outgoing call...');
    });

    socket.on('INBOUND_CALL', (...args) => {
      log.info('Receiving incoming call...');

      if (props.callerState === 'listening')
        startIncomingCall(props, args[0].number);
      else {
        log.info('Cannot place a call when a current call is in progress');
      }
    });
  }
};

export const startIncomingCall = (props, number) => {
  const details = {
    number,
    direction: 'in',
    existing: false,
  };
  props.setCallerState('ringing');
  props.setCallerDetails(details);
};

export const startOutgoingCall = (props, id) => {
  const details = {
    id,
    direction: 'out',
    existing: true,
  };
  props.setCallerState('ringing');
  setTimeout(() => {
    props.setCallerState('connected');
  }, 2000);

  props.setCallerDetails(details);
};
