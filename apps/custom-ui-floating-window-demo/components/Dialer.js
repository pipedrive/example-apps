import { useEffect } from 'react';
import ActionButtons from './Dialer/ActionButtons';
import CallerDetails from './Dialer/CallerDetails';
import CallStatus from './Dialer/CallStatus';
import Footer from './Footer';

const Dialer = (props) => {
  const updateCallerDetails = (props, data) => {
    props.setCallerDetails({
      ...props.callerDetails,
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
      `/api/getContact?id=${props.callerDetails.id}&number=${props.callerDetails.number}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        updateCallerDetails(props, data);
      });
  }, []);

  return (
    <div className="vh-100">
      <nav className="navbar navbar-light bg-mildgreen">
        <div className="container-fluid">
          <span className="navbar-brand"> 🟢 Hello, {props.user.name} </span>
        </div>
      </nav>
      <CallStatus {...props} />
      <CallerDetails {...props} />
      <div className="fixed-bottom m-2">
        <ActionButtons {...props} />
        <Footer />
      </div>
    </div>
  );
};

export default Dialer;
