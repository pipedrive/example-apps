/**
 * Handle incoming calls and manipulate the state of UI accordingly.
 */
function handleIncomingCall(call) {
    log(`Incoming call from ${call.parameters.From}`);

    //show incoming call div and incoming phone number
    $('#reject-call').removeClass('invisible');
    $('#answer-call').removeClass('invisible');
    $('#caller-details').removeClass('invisible');
    $('#caller-details').html(`<b>Incoming call from ${call.parameters.From}</b>`);

    //add event listeners for Accept, Reject, and Hangup buttons
    $('#answer-call').on('click', () => {
        call.accept();
    });

    $('#reject-call').on('click', () => {
        call.reject();
    });

    $('#reject-call').on('click', () => {
        call.disconnect();
    });

    // add event listener to call object
    call.on("cancel", () => {
        log('The call has been canceled.');
        resetDialState();
    });
    call.on("disconnect", () => {
        log('The call has been disconnected.');
        resetDialState();
    });
    call.on("reject", () => {
        log('The call has been rejected.');
        resetDialState();
    });
}