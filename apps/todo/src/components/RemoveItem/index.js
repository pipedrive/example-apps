import React from 'react';

import './style.css';

const RemoveItem = ({ onClick }) => {
  return (
    <button className="RemoveItem" onClick={onClick}>
      ❌
    </button>
  );
};

export default RemoveItem;
