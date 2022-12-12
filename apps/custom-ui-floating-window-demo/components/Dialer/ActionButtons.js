const ActionButtons = (props) => {
  let buttons = [];

  // Takes the user back to dialer by changing the state
  let hangup = async () => {
    props.setCallerState('listening');
  };

  let createNewContact = async () => {
    let notes = document.getElementById('notes').value;
    let name = document.getElementById('contact_name').value;
    // Create Contact
    const newContact = await fetch('/api/addContact', {
      method: 'POST',
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

  let addNotesToContact = async () => {
    let notes = document.getElementById('notes').value;

    await fetch('/api/addNotesToContact', {
      method: 'POST',
      body: JSON.stringify({
        id: props.callerDetails.id,
        notes,
      }),
    });

    props.setCallerState('disconnected');
  };

  // Only show the 'Answer' and 'Reject' buttons during Incoming calls
  if (
    props.callerDetails.direction === 'in' &&
    props.callerState === 'ringing'
  ) {
    // Answer Button
    buttons.push(
      <button type="button" className="btn btn-success mt-2 w-100">
        Answer
      </button>
    );
    // Reject Button
    buttons.push(
      <button type="button" className="btn btn-danger mt-2 w-100">
        Reject
      </button>
    );
  }

  // When to show the 'Hang up'button
  if (props.callerState === 'connected' || props.callerState === 'ringing') {
    buttons.push(
      <button
        type="button"
        className="w-100 mt-2  btn btn-danger"
        onClick={hangup}
      >
        Hang Up
      </button>
    );
  }

  // Hang Up + propsual Action button
  if (props.callerState === 'connected') {
    if (!props.callerDetails.existing) {
      buttons.push(
        <button
          type="button"
          className="w-100 mt-2 btn btn-warning"
          onClick={createNewContact}
        >
          Hang Up and Create Contact
        </button>
      );
    } else {
      if (props.callerDetails.relatedDeals)
        buttons.push(
          <button
            type="button"
            className="w-100 mt-2 btn btn-warning"
            onClick={addNotesToDeal}
          >
            Hang Up and add notes to deal.
          </button>
        );
      else
        buttons.push(
          <button
            type="button"
            className="w-100 mt-2 btn btn-warning"
            onClick={addNotesToContact}
          >
            Hang Up and add notes to contact
          </button>
        );
    }
  }

  return <> {buttons} </>;
};

export default ActionButtons;
