const db = {
    // object of objects
    // key is a combination of userId_companyId
};

async function saveInstallation(userId, companyId, tokens) {
    db[`${userId}_${companyId}`] = {
        ...tokens,
        userId,
        companyId,
    };
}

async function deleteInstallation(userId, companyId) {
    delete db[`${userId}_${companyId}`];
}

async function getClientInstallation(userId, companyId) {
    return db[`${userId}_${companyId}`];
}


async function updateClientInstallation() {

}

module.exports = {
    db,
    saveInstallation,
    deleteInstallation,
    getClientInstallation,
    updateClientInstallation,
};