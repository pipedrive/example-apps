import { Server } from "Socket.IO";
import logger from "../../shared/logger";
const log = logger("Socket 🔌");

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    log.info("Socket is already running");
  } else {
    log.info("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.onAny((eventName, ...args) => {
        // Log event details for reference
        log.info(eventName, "Server has received an event event");
        log.info(args[0], "Payload");
        // Broadcast it to the rest
        socket.broadcast.emit(eventName, args[0]);
      });
    });
  }
  res.end();
};

export default SocketHandler;
