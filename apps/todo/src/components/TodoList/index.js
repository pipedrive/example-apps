import React, { useEffect, useState } from 'react';
import SurfaceSDK, { Command, Modal } from '@pipedrive/surface-sdk';

import CallToAction from '../CallToAction';
import TodoItemEdit from '../TodoItem/TodoItemEdit';
import TodoItemView from '../TodoItem/TodoItemView';
import AddItem from '../AddItem';

import buildTodoListUrl from '../../utils/build-todo-list-url';
import apiRequest from '../../utils/api-request';
import computeTodolistHeight from '../../utils/compute-todolist-height';

const sdk = new SurfaceSDK();

const TodoList = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [ctaVisible, setCtaVisible] = useState(true);
  const todoListUrl = buildTodoListUrl();

  useEffect(() => {
    const fetchRecords = async () => {
      const todoRecords = [];
      const result = await apiRequest(todoListUrl, 'GET');

      for (const recordId in result) {
        if (result[recordId].deleted) {
          continue;
        }

        todoRecords.push({
          ...result[recordId],
          id: recordId,
          type: 'view',
        });
      }

      setTodoList(todoRecords);

      if (todoRecords.length) {
        setCtaVisible(false);
      }

      sdk.initialize({ size: { height: computeTodolistHeight(todoRecords) }});
    }

    fetchRecords();
  }, []);

  const saveTodoItem = async ({ title, checked }, { id: todoId }) => {
    const { id } = await apiRequest(todoListUrl, 'POST', { title, checked });

    setTodoList(todoList.map(todo => todo.id === todoId ? ({ type: 'view', title, checked, id }) : todo))
  }

  const toggleTodoItem = async (todo) => {
    const { id, title, checked } = todo;

    await apiRequest(todoListUrl, 'PUT', {
      title,
      checked: !checked,
      id
    });

    setTodoList(todoList.map(todo => todo.id === id ? ({ ...todo, checked: !checked }) : todo))
  }

  const removeTodoItem = async (todo) => {
    const { id } = todo;
    const todoItemUrl = `${todoListUrl}/${todo.id}`;

    await apiRequest(todoItemUrl, 'DELETE');

    const updatedTodoList = todoList.filter(todo => todo.id !== id);

    setTodoList(updatedTodoList);
    sdk.execute(Command.RESIZE, { height: computeTodolistHeight(updatedTodoList) });

    await sdk.execute(Command.SHOW_SNACKBAR, {
      message: 'Task was deleted',
    });
  }

  const addTodoItem = () => {
    const updatedTodoList = [...todoList, { id: new Date().getTime(), type: 'edit' }];
    setTodoList(updatedTodoList);

    sdk.execute(Command.RESIZE, { height: computeTodolistHeight(updatedTodoList) });
  }

  const convertToDeal = ({ title }) => {
    sdk.execute(Command.OPEN_MODAL, { type: Modal.DEAL, prefill: { title } });
  }

  const hideCallToAction = () => {
    setCtaVisible(false);
    addTodoItem();
  }

  if (ctaVisible) {
    return (
      <CallToAction onClick={hideCallToAction} />
    )
  }

  return (
      <div>
        {todoList.map(todo => (
          todo.type === 'view' ? <TodoItemView
            checked={todo.checked}
            title={todo.title}
            key={todo.id}
            onToggle={() => toggleTodoItem(todo)}
            onRemove={() => removeTodoItem(todo)}
            onConversion={() => convertToDeal(todo)}
          /> : (
            <TodoItemEdit onSubmit={(payload) => saveTodoItem(payload, todo)} key={todo.id}/>
          ))
        )}

        <AddItem onClick={addTodoItem} />
      </div>
  );
}

export default TodoList;
