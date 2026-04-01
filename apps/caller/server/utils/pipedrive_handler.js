const axios = require('axios');

async function getUser(accessToken) {
    const response = await axios.get('https://api.pipedrive.com/v1/users/me', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    return response.data;
}

async function getPersons(accessToken) {
    const response = await axios.get('https://api.pipedrive.com/v1/persons', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    return response.data;
}

module.exports = {
    getUser,
    getPersons
};