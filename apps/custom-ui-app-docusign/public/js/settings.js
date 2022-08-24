// Add settings to the database upon save
$(document).on('click', '#save_configs', function () {
    const settings = {
            docusign_token: $("#docusign_token").val(),
            docusign_accid: $("#docusign_accid").val()
        },
        company_id = $("#company_id").val();
    $.ajax({
        type: "POST",
        url: "/api/settings",
        data: JSON.stringify({
            company_id,
            settings: JSON.stringify(settings)
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log("Configs saved successfully");
            $('#save_status').html(showStatusMessage('Settings saved successfully!'));
        },
        error: function (errMsg) {
            console.error("Saving configs failed", errMsg);
            $('#save_status').html(showStatusMessage('Failed saving settings!'));
        }
    });
});

// Shows a status message
function showStatusMessage(message) {
    return `<div class="alert alert-success alert-dismissible" role="alert"><div>${message}</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
}