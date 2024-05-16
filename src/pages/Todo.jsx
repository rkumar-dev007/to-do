import React, { useState } from 'react';
import TextInput from 'src/components/TextInput';
import Button from 'src/components/Button';
import useTodoStore from 'src/store';

function TodoList() {
  const toDos = useTodoStore((state) => state.toDos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const handleRemoveCompleted = useTodoStore((state) => state.handleRemoveCompleted);
  const clearAll = useTodoStore((state) => state.clearAll);


  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      addTodo({ text: inputValue, completed: false });
      setInputValue('');
    }
  };

  const handleStartEdit = (index) => {
    if (!toDos[index].completed) {
      setEditIndex(index);
      setEditValue(toDos[index].text);
    }
  };

  const handleSaveEdit = (index) => {
    editTodo(index, editValue);
    setEditIndex(null);
    setEditValue('');
  };

  const handleToggleComplete = (index) => {
    toggleTodo(index);
  };

  const handleRemoveTodo = (index) => {
    removeTodo(index);
    if (editIndex === index) {
      setEditIndex(null);
      setEditValue('');
    }
  };

  return (
    <main className='max-w-screen-md p-4 mx-auto' style={{ minHeight: 'calc(100vh - 116px)' }}>
      <div className="to-do-list-root border-solid border border-slate-300  rounded p-4">
        {!!toDos?.length ?
          <div className='flex justify-between items-center py-3'>
            <h2 className="text-lg font-medium">To-Do Listing</h2>
            <div className='flex'>
              <h3 className="text-sm text-red-600 px-2 mx-1 hover:text-white hover:bg-red-600 hover:cursor-pointer border-solid border border-red-600 rounded" onClick={handleRemoveCompleted}>Remove Completed</h3>
              <h3 className="text-sm text-red-600 px-2 mx-1 hover:text-white hover:bg-red-600 hover:cursor-pointer border-solid border border-red-600 rounded" onClick={clearAll}>Remove All</h3>
            </div>
          </div>
          : null
        }

        <ul className={!!toDos?.length ? 'mb-6' : null}>
          {toDos.map((toDo, index) => (
            <li key={index} className='p-2 border-solid border border-slate-300  rounded mb-1'>
              {editIndex === index ? (
                <div className='flex'>
                  <TextInput
                    id={`existing-to-do-item-${index}`}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <Button onClick={() => handleSaveEdit(index)} btnText={'Update'} />
                </div>
              ) : (
                <div className='flex flex-col md:flex-row'>
                  <p className={`md:w-2/3 hover:cursor-pointer ${toDo.completed ? 'line-through text-gray-400' : null}`} onClick={() => handleToggleComplete(index)}>{toDo.text}</p>
                  <div className='flex items-center md:w-1/3 justify-center my-3'>
                    <Button onClick={() => handleStartEdit(index)} btnText={'Edit'} />
                    <Button onClick={() => handleRemoveTodo(index)} btnText={'Delete'} />
                    <Button onClick={() => handleToggleComplete(index)} btnText={toDo.completed ? 'Mark Incomplete' : 'Mark complete'} />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-medium">Add new To-Do Item</h3>
        <div className='flex'>
          <TextInput
            id='new-to-do-item'
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your to-do"
          />
          <Button onClick={handleAddTodo} btnText={'Add'} />
        </div>
        {/* <button onClick={handleRemoveCompleted}>Remove Completed</button> */}
      </div>
    </main>

  );
}

export default TodoList;
