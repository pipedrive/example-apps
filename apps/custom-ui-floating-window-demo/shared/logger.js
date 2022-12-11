const pino = require("pino");
const logger = (name) => {
  return pino({
    name,
  });
};

export default logger;
