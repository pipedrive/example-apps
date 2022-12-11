import logger from "./logger";
const log = logger("socket");

export const handleSocketCommunication = (socket, context, sdk) => {
  if (socket) {
    socket.on("connect", () => {
      log.info(`Client connected.`);
    });

    socket.on("OUTBOUND_CALL", (...args) => {
      log.info("Receiving outgoing call...");
    });

    socket.on("INBOUND_CALL", (...args) => {
      log.info("Receiving incoming call...");

      if (context.callerState === "listening")
        startIncomingCall(context, args[0].number);
      else {
        log.info("Cannot place a call when a current call is in progress");
      }
    });
  }
};

export const startIncomingCall = (context, number) => {
  const details = {
    id: undefined,
    number,
    direction: "in",
    existing: false,
  };
  context.setCallerState("ringing");
  setTimeout(() => {
    context.setCallerState("connected");
  }, 2000);

  context.setCallerDetails(details);
};

export const startOutgoingCall = (context, id) => {
  const details = {
    id,
    number: undefined,
    direction: "out",
    existing: true,
  };
  context.setCallerState("ringing");
  setTimeout(() => {
    context.setCallerState("connected");
  }, 2000);

  context.setCallerDetails(details);
};
