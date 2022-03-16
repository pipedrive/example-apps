import React, { useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { apiUri } from "../../frontend-config";
import { GlobalContext } from '../../context/GlobalContext';
import { Command } from '@pipedrive/surface-sdk';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

async function apiRequest(url, method, payload = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (method !== 'GET') {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(url, options);
  
  if (method === 'GET') {
    return response.json();
  }

  return await response;
}

function Todo({ todo, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.checked ? "line-through" : "" }}
    >
      {todo.title}
      <div>
        <button onClick={() => completeTodo(todo)}>✔️</button>
        <button onClick={() => removeTodo(todo)}>❌</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

function Todos() {
  const [todos, setTodos] = React.useState([]);
  const { surfaceSdk } = useContext(GlobalContext);
  const query = useQuery();
  const URL = `${apiUri}/todo/${query.get('userId')}/${query.get('companyId')}/${query.get('selectedIds')}`;

  useEffect(() => {
    const fetchRecord = async () => {
      await fetchRecords();
    }

    fetchRecord();
  }, []);

  async function fetchRecords() {
    const todoRecords = [];
    const result = await apiRequest(URL, 'GET');

    for (const recordId in result) {
      if (result[recordId].deleted) {
        continue;
      }

      todoRecords.push({
        ...result[recordId],
        id: recordId,
      });
    }

    setTodos(todoRecords);
  }
  
  async function addTodo(title) {
    const URL = `${apiUri}/todo/${query.get('userId')}/${query.get('companyId')}/${query.get('selectedIds')}`;
    await apiRequest(URL, 'POST', { title });

    await fetchRecords();
  }

  async function completeTodo(todo) {
    const URL = `${apiUri}/todo/${query.get('userId')}/${query.get('companyId')}/${query.get('selectedIds')}`;
    await apiRequest(URL, 'PUT', {
      title: todo.title,
      checked: !todo.checked,
      id: todo.id
    });

    await fetchRecords();
  }

  async function removeTodo(todo) {
    const URL = `${apiUri}/todo/${query.get('userId')}/${query.get('companyId')}/${query.get('selectedIds')}/${todo.id}`;


    await surfaceSdk.execute(Command.SHOW_SNACKBAR, {
      message: 'Task was deleted',
    });

    await apiRequest(URL, 'DELETE');

    await fetchRecords();
  }

  return (
      <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

Todos.propTypes = {};

export default Todos;
