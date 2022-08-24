// Shows a Snack Bar with a message
async function showSnackBar(message) {
    const sdk = await new AppExtensionsSdk().initialize();
    await sdk.execute(AppExtensionsSdk.Command.SHOW_SNACKBAR, {
        message
    });
}

// Shows a modal with a given data
async function showModal(data) {
    const sdk = await new AppExtensionsSdk().initialize();
    await sdk.execute(AppExtensionsSdk.Command.OPEN_MODAL, {
        type: AppExtensionsSdk.Modal.JSON_MODAL,
        action_id: '5c5fb865-f967-4bc2-88eb-96cae0ee74e7', // ID associated with the Custom UI Modal (visible in Marketplace Manager)
        data
    });
};

// Sends the document to the contact associated with the deal
$(document).on('click', '.send-doc', function (e) {
    const template_id = e.target.dataset.id;
    $.ajax({
        type: "POST",
        url: "/api/send_document",
        data: JSON.stringify({
            template_id,
            deal_id,
            company_id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            showSnackBar('Document sent successfully');
        },
        error: function (errMsg) {
            showSnackBar('Sending document failed. Check the console for details.');
            console.error(errMsg);
        }
    });
});

// Generates a preview by requesting the preview session URL
$(document).on('click', '.preview-doc', function (e) {
    const template_id = e.target.dataset.id;
    $.ajax({
        type: "POST",
        url: "/api/generate_preview",
        data: JSON.stringify({
            company_id,
            template_id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            showModal(data);
        },
        error: function (errMsg) {
            showSnackBar('Generating template preview failed. Check the console for details.');
            console.error(errMsg);
        }
    });
});