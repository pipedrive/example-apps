const CallStatus = (props) => {
  let statusMsg = '';
  // If a call has been picked up, mark it as ongoing.
  if (props.callerState === 'connected') {
    statusMsg += '[Ongoing] ';
  }

  // Is it an incoming or outgoing call?
  if (props.callerDetails.direction === 'in') {
    statusMsg += 'Incoming Call';
  } else if (props.callerDetails.direction === 'out') {
    statusMsg += 'Outgiong Call';
  }

  // If its disconnected, then it is over
  if (props.callerState === 'disconnected') {
    statusMsg += ' Over';
  }
  return <div className="w-100 p-2 status-indicator">{statusMsg}</div>;
};

export default CallStatus;
