const Account = require('./account');
const util = require('../util/helper')

Account.sync();

// Get settings associated with an account
const getSettings = async (company_id) => {
    try {
        const record = await Account.findOne({
            where: {
                company_id
            }
        });
        if (record && String(record.dataValues.settings).length > 1)
            return {
                configured: true,
                values: JSON.parse(record.dataValues.settings)
            }
        else
            return {
                configured: false
            }
    } catch (error) {
        debug(error);
        throw new Error('Getting app settings from database failed');
    }
}

// Get Access Token Associated with a company
const getToken = async (company_id) => {
    try {
        const record = await Account.findOne({
            where: {
                company_id
            }
        });
        if (record && String(record.dataValues.refresh_token).length > 1) {
            // For the sake of simplicity, we obtain a new access token everytime using the refresh token
            // In the case of live apps, token refresh logic should be based on the expiry date of the access token
            const token = await util.getNewToken(record.dataValues.refresh_token);
            return {
                success: true,
                value: token.data.access_token
            }
        } else
            return {
                success: false
            }
    } catch (error) {
        debug(error);
        throw new Error('Getting app settings from database failed');
    }
}

// Creates a new company with empty settings value
const createCompany = async (company, token) => {
    try {
        await Account.upsert({
            company_id: company.company_id,
            company_name: company.company_name,
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            settings: '{}'
        });
    } catch (error) {
        debug(error);
        throw new Error('Getting app settings from database failed');
    }
}

// Update settings associated with an account
const updateSettings = async (company_id, settings) => {
    try {
        await Account.update({
            settings
        }, {
            where: {
                company_id
            }
        });
    } catch (error) {
        debug(error)
        throw new Error('Updating app settings in the database failed');
    }
}

module.exports = {
    getToken,
    getSettings,
    createCompany,
    updateSettings
};