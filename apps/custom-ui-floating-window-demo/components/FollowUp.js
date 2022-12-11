import CallStatus from "./Dialer/CallStatus";
import FollowUpActionButtons from "./FollowUp/ActionButtons";
import Footer from "./Footer";

export default function FollowUp(context) {
  // Set Follow up action text
  const renderFollowUpCompletion = () => {
    if (context.callerDetails.existing === false) {
      return "✅ Contact Saved";
    } else {
      return "✅ Call Log Saved";
    }
  };

  return (
    <div class="vh-100">
      <nav class="navbar navbar-light bg-mildgreen">
        <div class="container-fluid">
          <span class="navbar-brand"> 🟢 Hello, {context.user.name} </span>
        </div>
      </nav>
      <CallStatus {...context} />
      <div class="p-2">
        <div class="position-absolute top-50 start-50 translate-middle text-center">
          <h6>{renderFollowUpCompletion(context)}</h6>
        </div>
      </div>
      <div class="fixed-bottom m-2">
        <FollowUpActionButtons {...context} />
        <Footer />
      </div>
    </div>
  );
}
