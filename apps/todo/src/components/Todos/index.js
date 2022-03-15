import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { apiUri } from "../../frontend-config";

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const useFetch = (url, method, payload = {}) => {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    async function fetchData() {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
      }

      if(method !== 'GET') {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(url, options);

      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, [url]);

  return data;
};

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.checked ? "line-through" : "" }}
    >
      {todo.title}
      <div>
        <button onClick={() => completeTodo(index)}>✔️</button>
        <button onClick={() => removeTodo(index)}>❌</button>
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

const Todos = () => {
    const query = useQuery();
    const URL = `${apiUri}/todo/${query.get('userId')}/${query.get('companyId')}/${query.get('selectedIds')}`;
    const result = useFetch(URL, 'GET');

    const todoRecords = [];
    const defaultRecords = [
      {
        title: "No records for this deal yet",
        checked: false
      },
      {
        title: "No records for this deal yet",
        checked: false
      },
    ];

    for (const recordId in result) {
      todoRecords.push({
        ...result[recordId],
        id: recordId,
      });
    }

    console.log(todoRecords);
    console.log(defaultRecords);
  
    const [todos, setTodos] = React.useState(defaultRecords);
  
    const addTodo = title => {
      // const URL = `${apiUri}/todo/${query.get('userId')}/${query.get('companyId')}/${query.get('selectedIds')}`;
      // const result = useFetch(URL, 'POST', { title });

      const newTodos = [...todos, { title }];
      setTodos(newTodos);
    };
  
    const completeTodo = index => {
      // const URL = `${apiUri}/todo/${query.get('userId')}/${query.get('companyId')}/${query.get('selectedIds')}`;
      // const result = useFetch(URL, 'PUT', {
      //   "title": "Something new 1211",
      //   "checked": true,
      //   "id": 2
      // });

      const newTodos = [...todos];
  
      if(newTodos[index].checked) {
        newTodos[index].checked = false;
      } else {
        newTodos[index].checked = true;
      }
  
      setTodos(newTodos);
    };
  
    const removeTodo = index => {
      // const URL = `${apiUri}/todo/${query.get('userId')}/${query.get('companyId')}/${query.get('selectedIds')}/${index}`;
      // const result = useFetch(URL, 'DELETE');

      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    };
  
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
};

Todos.propTypes = {};

export default Todos;
