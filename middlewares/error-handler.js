async function failSafeHandler(error, req, res, next) { // generic handler
    console.log(error);
    res.status(500).send(error.stack);
}

module.exports = failSafeHandler;