const ActionButtons = (props) => {
  // Takes the user back to dialer by changing the state
  let hangup = async () => {
    props.setCallerState('listening');
  };
  // Creates a new contact in Pipedrive
  let createNewContact = async () => {
    let notes = document.getElementById('notes').value;
    let name = document.getElementById('contact_name').value;

    const newContact = await fetch('/api/addContact', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        number: props.callerDetails.number,
        notes,
      }),
    });
    let contactObj = await newContact.json();
    let contact = contactObj.data;

    props.setCallerDetails({ ...props.callerDetails, id: contact.id });
    props.setCallerState('disconnected');
  };

  // Adds a CallLog to an associated deal
  let addNotesToDeal = async () => {
    const note = document.getElementById('notes').value;
    const dealId = document.getElementById('deals').value;

    const start_time = new Date()
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');
    const end_time = start_time;

    await fetch('/api/addCallLogsToDeal', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dealId,
        note,
        to_phone_number: props.callerDetails.number,
        start_time,
        end_time,
        outcome: 'busy',
      }),
    });

    props.setCallerState('disconnected');
  };

  // Adds notes to the associated contact
  let addNotesToContact = async () => {
    let notes = document.getElementById('notes').value;

    await fetch('/api/addNotesToContact', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.callerDetails.id,
        notes,
      }),
    });

    props.setCallerState('disconnected');
  };

  return (
    <>
      {/* Only show the 'Answer' and 'Reject' buttons during Incoming calls */}
      {props.callerDetails.direction === 'in' &&
        props.callerState === 'ringing' && (
          <>
            <button type="button" className="btn btn-success mt-2 w-100">
              Answer
            </button>
            <button type="button" className="btn btn-danger mt-2 w-100">
              Reject
            </button>
          </>
        )}
      {/* Common hang-up button is shown for connected and ringing states */}
      {(props.callerState === 'connected' ||
        props.callerState === 'ringing') && (
        <button
          type="button"
          className="w-100 mt-2  btn btn-danger"
          onClick={hangup}
        >
          Hang Up
        </button>
      )}
      {/* Hang Up + Create Contact Action button if the call is connected and the contact is new */}
      {props.callerState === 'connected' && !props.callerDetails.existing && (
        <button
          type="button"
          className="w-100 mt-2 btn btn-warning"
          onClick={createNewContact}
        >
          Hang Up and Create Contact
        </button>
      )}
      {/* Hang Up + Add notes to deal if the contact has related deals */}
      {props.callerState === 'connected' &&
        props.callerDetails.existing &&
        props.callerDetails.relatedDeals && (
          <button
            type="button"
            className="w-100 mt-2 btn btn-warning"
            onClick={addNotesToDeal}
          >
            Hang Up and add notes to deal.
          </button>
        )}
      {/* Hang Up + Add notes to contact if the contact has no related deals */}
      {props.callerState === 'connected' &&
        props.callerDetails.existing &&
        !props.callerDetails.relatedDeals && (
          <button
            type="button"
            className="w-100 mt-2 btn btn-warning"
            onClick={addNotesToContact}
          >
            Hang Up and add notes to contact
          </button>
        )}
    </>
  );
};

export default ActionButtons;
