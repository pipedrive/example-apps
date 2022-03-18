const jwt = require('jsonwebtoken');
const config = require('../config');

function jwtCheck(req, res, next) {
    const { token } = req.query;

    jwt.verify(token, config.surfaceJwt);

    next();
}

module.exports = jwtCheck;