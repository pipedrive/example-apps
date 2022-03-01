const config = require('../config');

const db = {
    // object of objects
    // key is a combination of userId_companyId
};

function saveInstallation(userId, companyId, tokens) {
    db[`${userId}_${companyId}`] = {
        ...tokens,
        userId,
        companyId,
    };
}

function deleteInstallation(userId, companyId) {
    console.log(`${userId}_${companyId}`);

    delete db[`${userId}_${companyId}`];
}

function getClientInstallation(userId, companyId) {
    return db[`${userId}_${companyId}`];
}


function updateClientInstallation() {

}

module.exports = {
    db,
    saveInstallation,
    deleteInstallation,
    getClientInstallation,
    updateClientInstallation,
};