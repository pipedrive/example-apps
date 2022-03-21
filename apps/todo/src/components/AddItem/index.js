import React from 'react';

import './style.css';

const AddItem = ({ onClick }) => {
  return (
    <button onClick={onClick} className="AddItem">
      Click here to add a new item
    </button>
  );
};

export default AddItem;
