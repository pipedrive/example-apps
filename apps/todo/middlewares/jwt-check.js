const jwt = require('jsonwebtoken');

function jwtCheck(secret) {
    return function (req, res, next) {
      const { token } = req.query;

      jwt.verify(token, secret);

      next();
    }
}

module.exports = jwtCheck;
