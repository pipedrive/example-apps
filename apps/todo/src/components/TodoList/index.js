import React, { useEffect, useState } from 'react';
import SurfaceSDK, { Command, Modal } from '@pipedrive/app-extensions-sdk';

import CallToAction from '../CallToAction';
import TodoItemEdit from '../TodoItem/TodoItemEdit';
import TodoItemView from '../TodoItem/TodoItemView';
import AddItem from '../AddItem';

import buildTodoListUrl from '../../utils/build-todo-list-url';
import computeTodolistHeight from '../../utils/compute-todolist-height';
import ApiClient from '../../utils/api-client';

const sdk = new SurfaceSDK();
const apiClient = new ApiClient(sdk);

const todoListUrl = buildTodoListUrl();

const urlSearchParams = new URLSearchParams(window.location.search);

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const result = await apiClient.fetchWithToken(todoListUrl, 'GET', null, urlSearchParams.get('token'));

      const todoRecords = [];

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

      sdk.initialize({ size: { height: computeTodolistHeight(todoRecords) }});
    }

    fetchRecords();
  }, []);

  const saveTodoItem = async ({ title, checked }, { id: todoId }) => {
    const { id } = await apiClient.fetch(todoListUrl, 'POST', { title, checked });

    setTodoList(todoList.map(todo => todo.id === todoId ? ({ type: 'view', title, checked, id }) : todo));
  }

  const toggleTodoItem = async (todo) => {
    const { id, title, checked } = todo;

    await apiClient.fetch(todoListUrl, 'PUT', {
      title,
      checked: !checked,
      id
    });

    if (!checked) {
      await sdk.execute(Command.SHOW_SNACKBAR, {
        message: 'Task marked as done',
      });
    }

    setTodoList(todoList.map(todo => todo.id === id ? ({ ...todo, checked: !checked }) : todo));
  }

  const removeTodoItem = async (todo) => {
    const { confirmed } = await sdk.execute(Command.SHOW_CONFIRMATION, {
      title: 'Confirm',
      description: 'Are you sure you want to complete this action?'
    });

    if (!confirmed) {
      return;
    }

    const { id } = todo;
    const todoItemUrl = `${todoListUrl}/${id}`;

    await apiClient.fetch(todoItemUrl, 'DELETE');

    const updatedTodoList = todoList.filter(todo => todo.id !== id);

    setTodoList(updatedTodoList);

    sdk.execute(Command.RESIZE, { height: computeTodolistHeight(updatedTodoList) });

    sdk.execute(Command.SHOW_SNACKBAR, {
      message: 'Task was deleted',
    });
  }

  const addTodoItem = () => {
    const updatedTodoList = [...todoList, { id: new Date().getTime(), type: 'edit' }];
    setTodoList(updatedTodoList);

    sdk.execute(Command.RESIZE, { height: computeTodolistHeight(updatedTodoList) });
  }

  const convertToDeal = async ({ title }) => sdk.execute(Command.OPEN_MODAL, { type: Modal.DEAL, prefill: { title } });

  if (!todoList.length) {
    return (
      <CallToAction onClick={addTodoItem} />
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
