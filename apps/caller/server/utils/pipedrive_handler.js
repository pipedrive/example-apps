const request = require('request-promise');
/**
 * Get details pertaining to an authorized user
 */
async function getUser(accessToken) {
    const requestOptions = {
        uri: 'https://api.pipedrive.com/v1/users/me',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        json: true
    };
    const userInfo = await request(requestOptions);

    return userInfo;
}

/**
 * Retrieve contact details associated with the company
 * Note that you need to have `Contacts` OAuth scope to access these details
 */
async function getPersons(accessToken) {
    const requestOptions = {
        uri: 'https://api.pipedrive.com/v1/persons',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        json: true
    };
    const persons = await request(requestOptions);

    return persons;
}

module.exports = {
    getUser,
    getPersons
};