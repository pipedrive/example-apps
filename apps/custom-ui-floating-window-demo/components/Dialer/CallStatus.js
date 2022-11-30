const CallStatus = (context) => {
  let statusMsg = "";
  // If a call has been picked up, mark it as ongoing.
  if (context.callerState === "connected") {
    statusMsg += "[Ongoing] ";
  }

  // Is it an incoming or outgoing call?
  if (context.callerDetails.direction === "in") {
    statusMsg += "Incoming Call";
  } else if (context.callerDetails.direction === "out") {
    statusMsg += "Outgiong Call";
  }

  // If its disconnected, then it is over
  if (context.callerState === "disconnected") {
    statusMsg += " Over";
  }
  return <div class="w-100 p-2 status-indicator">{statusMsg}</div>;
};

export default CallStatus;
