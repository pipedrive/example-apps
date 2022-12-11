import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppContext } from "../shared/context";

import io from "Socket.IO-client";
import logger from "../shared/logger";
import { initalizeSession } from "../shared/oauth";

import ContactList from "../components/ContactList";
import Dialer from "../components/Dialer";
import FollowUp from "../components/FollowUp";
import { initializeSDK } from "../shared/custom_ui_sdk";
import { handleSocketCommunication } from "../shared/socket";
import Login from "../components/Login";

const log = logger("Core ✨");

export const getServerSideProps = async ({ req, res, query }) => {
  log.info("Checking session details based on query parameters");
  const session = await initalizeSession(req, res, query.userId);
  return session.auth
    ? { props: { auth: true, session } }
    : { props: { auth: false } };
};

export default function Home({ auth, session }) {
  const router = useRouter();
  const context = useAppContext();
  const socket = io();
  let sdk;

  useEffect(() => {
    if (auth) {
      // Update the context variables once the session is initialized
      log.info("Setting user ID to ", router.query.userId);
      context.setUser(session);
      // Initialize Custom UI SDK and Socket communications
      (async () => {
        sdk = await initializeSDK();
        await fetch("/api/socket");
        handleSocketCommunication(socket, context, sdk);
      })();
    }
  }, [router]);

  // Not logged-in? Login again
  if (auth === false) {
    return <Login />;
  }

  switch (context.callerState) {
    case "listening": {
      return <ContactList {...context} />;
    }
    case "ringing":
    case "connected": {
      return <Dialer {...context} />;
    }
    case "disconnected": {
      return <FollowUp {...context} />;
    }
    default:
      return <ContactList {...context} />;
  }
}
