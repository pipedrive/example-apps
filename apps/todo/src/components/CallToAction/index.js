import React from 'react';

import './style.css'

const CallToAction = ({ onClick }) => {
  return (
    <button className="CallToAction" onClick={onClick}>
      Click here to start adding items to your list ✔
    </button>
  );
};

export default CallToAction;
