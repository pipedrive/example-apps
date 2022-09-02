const axios = require('axios');
const debug = require('debug')('app:helper');
const querystring = require('querystring');
const pipedrive = require('pipedrive');
const apiClient = pipedrive.ApiClient.instance;

// Generates a new token based on the refresh token
const getNewToken = async (refresh_token) => {
    try {
        return axios({
            method: 'POST',
            url: 'https://oauth.pipedrive.com/oauth/token',
            headers: {
                Authorization: `Basic ${Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')}`,
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token,
            }),
        });
    } catch (error) {
        debug(error);
        throw new Error('Getting new token from refresh token failed');
    }
};

// Get the DocuSign templates via REST API
async function getDocuSignTemplates(account_id, docusign_token) {
    try {
        const templates = await axios({
            method: 'GET',
            url: `https://demo.docusign.net/restapi/v2.1/accounts/${account_id}/templates`,
            headers: {
                'Authorization': `Bearer ${docusign_token}`
            }
        });
        return templates.data;
    } catch (error) {
        debug(error);
        throw new Error('API request for getting DocuSign templates failed');
    }
}

// Get the DocuSign Template Preview URL via REST API
async function generateTemplatePreviewURL(template_id, account_id, docusign_token) {
    try {
        return await axios({
            method: 'POST',
            url: `https://demo.docusign.net/restapi/v2.1/accounts/${account_id}/templates/${template_id}/views/edit`,
            headers: {
                'Authorization': `Bearer ${docusign_token}`
            },
            data: {
                'returnUrl': 'https://example.com'
            },
            json: true
        });
    } catch (error) {
        debug(error);
        throw new Error('API Request for generating template preview URL failed');
    }
}

// Creates a document from DocuSign template
async function createDocumentFromTemplate(account_id, template_id, docusign_token, signer_email, signer_name) {
    try {
        return await axios({
            method: 'POST',
            url: `https://demo.docusign.net/restapi/v2.1/accounts/${account_id}/envelopes`,
            headers: {
                'Authorization': `Bearer ${docusign_token}`
            },
            data: {
                'templateId': template_id,
                'templateRoles': [{
                    'email': signer_email,
                    'name': signer_name,
                    'roleName': 'signer'
                }],
                'status': 'sent'
            },
            json: true
        });
    } catch (error) {
        debug(error);
        throw new Error('API request for sending DocuSign document to the recipient failed');
    }
}

// Gets information about a particular deal (by ID) in Pipedrive
async function getDeal(deal_id, access_token) {
    try {
        apiClient.authentications.oauth2.accessToken = access_token;
        let dealsApi = new pipedrive.DealsApi();
        let deal = await dealsApi.getDeal(deal_id);
        return deal.data;
    } catch (error) {
        debug(error);
        throw new Error('API request to get deal by ID failed');
    }
}

// Generate error response, log the details
function getErrorResponse(name, detail, status_code, response) {
    console.error(`[${new Date().toISOString()}] ${name}: ${detail.message}`);
    debug(detail);
    response.status(status_code).send({
        success: false,
        message: name
    })
}

function logImportantURLs() {
    debug('App started.');
    const domain = process.env.APP_DOMAIN;
    const callBackUrl = `CallBack URL : https://${domain}/auth/callback`;
    const appPanelUrl = `Custom UI Panel URL : https://${domain}/ui/panel`;
    const appModalUrl = `Custom UI Modal URL : https://${domain}/ui/modal`;
    const appSettingsUrl = `Custom UI App Settings URL : https://${domain}/ui/settings`;

    console.info(`🟢 App is running\n${callBackUrl}\n${appPanelUrl}\n${appModalUrl}\n${appSettingsUrl}`);
}

module.exports = {
    getNewToken,
    getDeal,
    getDocuSignTemplates,
    getErrorResponse,
    generateTemplatePreviewURL,
    createDocumentFromTemplate,
    logImportantURLs
}