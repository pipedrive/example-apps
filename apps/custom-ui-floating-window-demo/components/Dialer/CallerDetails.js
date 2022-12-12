import Image from 'next/image';
import AdditionalCallerDetails from './AdditionalCallerDetails';

const CallerDetails = (context) => {
  if (context.callerState === 'ringing') {
    return (
      <div className="p-2">
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <Image
            src={context.callerDetails?.picture || '/profile.png'}
            alt={context.callerDetails.name}
            className="mb-3 caller-image"
            width="72px"
          />
          <h1> {context.callerDetails.name} </h1>
          <span> {context.callerDetails.number} </span>
        </div>
      </div>
    );
  } else if (context.callerState === 'connected') {
    return (
      <>
        <div className="row p-2">
          <div className="col-4">
            <Image
              src={context.callerDetails?.picture || '/profile.png'}
              className="mb-3 caller-image"
              alt={context.callerDetails.name}
              width="72px"
            />
          </div>
          <div className="col-6 p-2">
            <div className="position-relative mt-3">
              <h1> {context.callerDetails.name} </h1>
              <span> {context.callerDetails.number} </span>
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
            existingContact={context.callerDetails.existing}
            relatedDeals={context.callerDetails.relatedDeals}
          />
        </div>
      </>
    );
  }
};

export default CallerDetails;
