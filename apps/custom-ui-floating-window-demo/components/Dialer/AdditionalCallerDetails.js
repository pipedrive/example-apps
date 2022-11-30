const AdditionalCallerDetails = (props) => {
  if (!props.existingContact)
    return (
      <div class="mb-3">
        <label class="form-label"> Contact Name </label>
        <input
          id="contact_name"
          placeholder="Enter a contact name for this number"
          class="form-control"
        />
      </div>
    );
  else {
    if (props.relatedDeals?.length > 0) {
      return (
        <div class="mb-3">
          <label class="form-label"> Related Deal </label>
          <select id="deals" class="form-select">
            {props.relatedDeals.map((deal) => (
              <option key={deal.id} value={deal.id}>
                {deal.title} - {deal.value} {deal.currency}
              </option>
            ))}
          </select>
        </div>
      );
    } else
      return (
        <div>
          No related deals found. Notes will be saved against the contact
        </div>
      );
  }
};

export default AdditionalCallerDetails;
