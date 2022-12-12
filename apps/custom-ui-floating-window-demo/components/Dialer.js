import { useEffect } from 'react';
import ActionButtons from './Dialer/ActionButtons';
import CallerDetails from './Dialer/CallerDetails';
import CallStatus from './Dialer/CallStatus';
import Footer from './Footer';

const Dialer = (context) => {
  const updateCallerDetails = (context, data) => {
    context.setCallerDetails({
      ...context.callerDetails,
      name: data.name,
      picture: data?.picture_id?.pictures['128'] || '/profile.png',
      number: data.number,
      relatedDeals: data?.relatedDeals,
      existing: data.existing,
      id: data.id,
    });
  };

  useEffect(() => {
    fetch(
      `/api/getContact?id=${context.callerDetails.id}&number=${context.callerDetails.number}`
    )
      .then((res) => res.json())
      .then((data) => {
        updateCallerDetails(context, data);
      });
  }, []);

  return (
    <div className="vh-100">
      <nav className="navbar navbar-light bg-mildgreen">
        <div className="container-fluid">
          <span className="navbar-brand"> 🟢 Hello, {context.user.name} </span>
        </div>
      </nav>
      <CallStatus {...context} />
      <CallerDetails {...context} />
      <div className="fixed-bottom m-2">
        <ActionButtons {...context} />
        <Footer />
      </div>
    </div>
  );
};

export default Dialer;
