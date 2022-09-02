// Shows a Snack Bar with a message
async function showSnackBar(message) {
    const sdk = await new AppExtensionsSdk().initialize();
    await sdk.execute(AppExtensionsSdk.Command.SHOW_SNACKBAR, {
        message
    });
}

// Shows a modal with a given data
// For the 'action_id' parameter, you can specify either the Custom UI modal Name or the ID
async function showModal(data) {
    const sdk = await new AppExtensionsSdk().initialize();
    await sdk.execute(AppExtensionsSdk.Command.OPEN_MODAL, {
        type: AppExtensionsSdk.Modal.JSON_MODAL,
        action_id: 'Template Editor',
        data
    });
};

// Sends the document to the contact associated with the deal
$(document).on('click', '.send-doc', function (e) {
    const template_id = e.target.dataset.id;

    fetch('/api/send_document', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            dataType: "json",
            body: JSON.stringify({
                template_id,
                deal_id,
                company_id
            })
        }).then(response => {
            if (response.ok)
                return response.json()
            throw new Error(response);
        })
        .then(data => {
            showSnackBar('Document sent successfully');
        })
        .catch(error => {
            console.error(response);
            showSnackBar('Sending document failed. Check the console for details.');
        })
});

// Generates a preview by requesting the preview session URL
$(document).on('click', '.preview-doc', function (e) {
    const template_id = e.target.dataset.id;

    fetch('/api/generate_preview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            dataType: "json",
            body: JSON.stringify({
                company_id,
                template_id
            }),
        }).then(response => {
            if (response.ok)
                return response.json()
            throw new Error(response);
        })
        .then(data => {
            showModal(data);
        })
        .catch(error => {
            console.error(error);
            showSnackBar('Generating template preview failed. Check the console for details.');
        })
});