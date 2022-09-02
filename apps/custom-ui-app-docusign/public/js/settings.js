// Add settings to the database upon save
$(document).on('click', '#save_configs', function () {
    const settings = {
            docusign_token: $('#docusign_token').val(),
            docusign_accid: $('#docusign_accid').val()
        },
        company_id = $('#company_id').val();

    fetch('/api/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            dataType: 'json',
            body: JSON.stringify({
                company_id,
                settings: JSON.stringify(settings)
            })
        }).then(response => {
            if (response.ok)
                return response.json()
            throw new Error(response);
        })
        .then(data => {
            console.log('Configs saved successfully');
            $('#save_status').html(showStatusMessage('Settings saved successfully!', 'success'));
        })
        .catch(error => {
            console.error('Saving configs failed', error);
            $('#save_status').html(showStatusMessage('Failed saving settings!', 'danger'));
        })
});

// Shows a status message
function showStatusMessage(message, status) {
    return `<div class='alert alert-${status} alert-dismissible' role='alert'><div>${message}</div><button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>`
}