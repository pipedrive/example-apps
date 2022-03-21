const db = {
    // object of objects
    // key is a combination of userId_companyId_dealId
};

async function saveRecord(userId, companyId, dealId, record) {
    if (!db[`${userId}_${companyId}_${dealId}`]) {
        db[`${userId}_${companyId}_${dealId}`] = {};
    }

    const userRecordsObj = db[`${userId}_${companyId}_${dealId}`];
    const id = Object.keys(userRecordsObj).length + 1;

    userRecordsObj[Object.keys(userRecordsObj).length + 1] = {
        title: record.title,
        checked: false,
        deleted: false,
    };

    return { id };
}

async function deleteRecord(userId, companyId, dealId, recordId) {
    const record = db[`${userId}_${companyId}_${dealId}`][recordId];

    if (record) {
        record.deleted = true;
    }

    return record;
}

async function getRecord(userId, companyId, dealId, recordId) {
    if (recordId) {
        return db[`${userId}_${companyId}_${dealId}`][recordId];
    }

    return db[`${userId}_${companyId}_${dealId}`] ?? {};
}


async function updateRecord(userId, companyId, dealId, record) {
    const userRecordsObj = db[`${userId}_${companyId}_${dealId}`];

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
