import React from 'react';

import Checkbox from '../Checkbox';
import RemoveItem from '../RemoveItem';
import ConvertToDeal from '../ConvertToDeal';

import './style.css';

const TodoItemView = ({ onToggle, title, checked, onRemove, onConversion }) => {
  return (
    <Checkbox onClick={onToggle} checked={checked}>
        <span>
          {title}
        </span>
        <div className="Actions">
          <ConvertToDeal onClick={onConversion} />
          <RemoveItem onClick={onRemove} />
        </div>

    </Checkbox>
  );
};

export default TodoItemView;
