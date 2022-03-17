import React from 'react';

import './style.css';

const Checkbox = ({ children, checked, onClick }) => {
  return (
    <label className="form-control">
      <input type="checkbox" name="checkbox" checked={checked} onChange={() => onClick()}/>
      {children}
    </label>
  );
};

export default Checkbox;
