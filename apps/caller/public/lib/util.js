// Send to logger panel
function log(message) {
  $('#logs').val($('#logs').val() + "\n" + message);
}

// Reset the dial buttons
function resetDialState() {
  $('#reject-call').addClass('invisible');
  $('#answer-call').addClass('invisible');
  $('#caller-details').addClass('invisible');
}

// Bonus Feature: Add a number in the URL hash and auto populate Dialpad ;)
$(function () {
  const contact_hash = window.location.hash;
  if (contact_hash) {
    $('#phone-number').val(contact_hash.replace('#', ''))
  }
})