import AdditionalCallerDetails from "./AdditionalCallerDetails";

const CallerDetails = (context) => {
  if (context.callerState === "ringing") {
    return (
      <div class="p-2">
        <div class="position-absolute top-50 start-50 translate-middle text-center">
          <img
            src={context.callerDetails?.picture || "/profile.png"}
            class="mb-3 caller-image"
            width="72px"
          />
          <h1> {context.callerDetails.name} </h1>
          <span> {context.callerDetails.number} </span>
        </div>
      </div>
    );
  } else if (context.callerState === "connected") {
    return (
      <>
        <div class="row p-2">
          <div class="col-4">
            <img
              src={context.callerDetails?.picture || "/profile.png"}
              class="mb-3 caller-image"
              width="72px"
            />
          </div>
          <div class="col-6 p-2">
            <div class="position-relative mt-3">
              <h1> {context.callerDetails.name} </h1>
              <span> {context.callerDetails.number} </span>
            </div>
          </div>
        </div>
        <div class="p-2">
          <div class="mb-3">
            <label class="form-label"> Notes </label>
            <textarea
              id="notes"
              placeholder="Add notes to the call here. This will be added to the call recording."
              class="form-control"
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
