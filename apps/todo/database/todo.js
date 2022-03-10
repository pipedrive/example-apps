const db = {
    // object of objects
    // key is a combination of userId_companyId
};

async function saveRecord(userId, companyId, record) {
    if (!db[`${userId}_${companyId}`]) {
        db[`${userId}_${companyId}`] = {};
    }

    const userRecordsObj = db[`${userId}_${companyId}`];

    userRecordsObj[Object.keys(userRecordsObj).length + 1] = {
        title: record.title,
        checked: false,
        deleted: false,
    };
}

async function deleteRecord(userId, companyId, recordId) {
    const record = db[`${userId}_${companyId}`][recordId];

    if (record) {
        record.deleted = true;
    }

    return record;
}

async function getRecord(userId, companyId, recordId) {
console.log(recordId);

    if (recordId) {
        return db[`${userId}_${companyId}`][recordId];
    }

    return db[`${userId}_${companyId}`];
}


async function updateRecord(userId, companyId, record) {
    const userRecordsObj = db[`${userId}_${companyId}`];

    if(userRecordsObj[record.id]) {
        userRecordsObj[record.id] = {
            title: record.title,
            checked: record.checked,
            deleted: false,
        };
    }

}

module.exports = {
    db,
    saveRecord,
    deleteRecord,
    getRecord,
    updateRecord,
};