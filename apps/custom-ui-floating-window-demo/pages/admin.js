import { useEffect } from "react";
import io from "Socket.IO-client";
import logger from "../shared/logger";
const log = logger("admin");

const ControlCenter = () => {
  const socket = io();
  const dialPipedrive = () => {
    const number = document.getElementById("number").value;
    const agent = document.getElementById("agent").value;
    socket.emit("INBOUND_CALL", { number, agent });
  };

  useEffect(() => {
    (async () => {
      await fetch("/api/socket");
      if (socket) {
        socket.on("connect", () => {
          log.info(`☎️ Phone booth socket client connected.`);
        });
      }
    })();
  }, []);

  return (
    <div className="center-content">
      <div className="form-group mt-3">
        <label htmlFor="number">Phone number to fake dial</label>
        <input
          className="form-control"
          id="number"
          placeholder="Enter a number to dial"
        />
        <small id="emailHelp" className="form-text text-muted">
          Floating window will receive an incoming notification with this number
          and agent info
        </small>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="agent">Fake agent name</label>
        <input
          className="form-control"
          id="agent"
          placeholder="Calls will be routed only to this agent"
        />
      </div>
      <button className="mt-3 btn btn-primary" onClick={dialPipedrive}>
        Dial
      </button>
    </div>
  );
};

export default ControlCenter;
