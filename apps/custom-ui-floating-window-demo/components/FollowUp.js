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
    <div className="vh-100">
      <nav className="navbar navbar-light bg-mildgreen">
        <div className="container-fluid">
          <span className="navbar-brand"> 🟢 Hello, {context.user.name} </span>
        </div>
      </nav>
      <CallStatus {...context} />
      <div className="p-2">
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h6>{renderFollowUpCompletion(context)}</h6>
        </div>
      </div>
      <div className="fixed-bottom m-2">
        <FollowUpActionButtons {...context} />
        <Footer />
      </div>
    </div>
  );
}
