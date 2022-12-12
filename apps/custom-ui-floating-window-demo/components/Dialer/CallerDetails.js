import AdditionalCallerDetails from './AdditionalCallerDetails';

const CallerDetails = (props) => {
  if (props.callerState === 'ringing') {
    return (
      <div className="p-2">
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <img
            src={props.callerDetails?.picture || '/profile.png'}
            alt={props.callerDetails.name}
            className="mb-3 caller-image"
            width="72"
            height="72"
          />
          <h1> {props.callerDetails.name} </h1>
          <span> {props.callerDetails.number} </span>
        </div>
      </div>
    );
  } else if (props.callerState === 'connected') {
    return (
      <>
        <div className="row p-2">
          <div className="col-4">
            <img
              src={props.callerDetails?.picture || '/profile.png'}
              className="mb-3 caller-image"
              alt={props.callerDetails.name}
              width="72"
              height="72"
            />
          </div>
          <div className="col-6 p-2">
            <div className="position-relative mt-3">
              <h1> {props.callerDetails.name} </h1>
              <span> {props.callerDetails.number} </span>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="mb-3">
            <label className="form-label"> Notes </label>
            <textarea
              id="notes"
              placeholder="Add notes to the call here. This will be added to the call recording."
              className="form-control"
              rows="3"
            ></textarea>
          </div>
          <AdditionalCallerDetails
            existingContact={props.callerDetails.existing}
            relatedDeals={props.callerDetails.relatedDeals}
          />
        </div>
      </>
    );
  }
};

export default CallerDetails;
