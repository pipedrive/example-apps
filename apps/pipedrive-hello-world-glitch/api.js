const axios = require('axios');

async function getUser(accessToken) {
	const requestOptions = {
		url: 'https://api.pipedrive.com/v1/users/me',
		headers: {
			'Authorization': `Bearer ${accessToken}`
		},
		timeout: 10000
	};

	const userInfo = await axios(requestOptions);

	return userInfo.data;
}

async function getDeals(accessToken) {
	const requestOptions = {
		url: 'https://api.pipedrive.com/v1/deals?status=open',
		headers: {
			'Authorization': `Bearer ${accessToken}`
		},
		timeout: 10000
	};
	const deals = await axios(requestOptions);

	return deals.data;
}

async function updateDeal(id, outcome, accessToken) {
	const requestOptions = {
		url: `https://api.pipedrive.com/v1/deals/${id}`,
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${accessToken}`
		},
		data: {
			status: outcome
		},
		timeout: 10000
	};

	await axios(requestOptions);
}

module.exports = {
	getUser,
	getDeals,
	updateDeal
};