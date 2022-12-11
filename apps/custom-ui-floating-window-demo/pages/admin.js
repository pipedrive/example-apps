import { useEffect } from "react";
import io from "Socket.IO-client";
import logger from "../shared/logger";
const log = logger("admin");

export default function ControlCenter() {
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
    <div class="center-content">
      <div class="form-group mt-3">
        <label for="number">Phone number to fake dial</label>
        <input
          class="form-control"
          id="number"
          placeholder="Enter a number to dial"
        />
        <small id="emailHelp" class="form-text text-muted">
          Floating window will receive an incoming notification with this number
          and agent info
        </small>
      </div>
      <div class="form-group mt-3">
        <label for="agent">Fake agent name</label>
        <input
          class="form-control"
          id="agent"
          placeholder="Calls will be routed only to this agent"
        />
      </div>
      <button class="mt-3 btn btn-primary" onClick={dialPipedrive}>
        Dial
      </button>
    </div>
  );
}
