import React, { useRef, useState } from 'react';

import Checkbox from '../Checkbox';

import './style.css';

const TodoItemEdit = ({ onSubmit }) => {
  const ref = useRef();
  const [checked, setChecked] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const title = ref.current?.value;

    if (title) {
      onSubmit({ title, checked });
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <Checkbox checked={checked} onClick={() => setChecked(!checked)}>
       <input ref={ref} type="text" placeholder="Title" onClick={(e) => e.stopPropagation()} />
      </Checkbox>
    </form>
  );
};

export default TodoItemEdit;
