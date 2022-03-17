import React from 'react';

import './style.css';

const ConvertToDeal = ({ onClick }) => {
  return (
    <button className="ConvertToDeal" onClick={onClick}>
      🤝
    </button>
  );
};

export default ConvertToDeal;
