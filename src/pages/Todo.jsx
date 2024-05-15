import React, { useState } from 'react';
import TextInput from 'src/components/TextInput';
import Button from 'src/components/Button';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleStartEdit = (index) => {
    if (!todos[index].completed) {
      setEditIndex(index);
      setEditValue(todos[index].text);
    }
  };

  const handleSaveEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editValue;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue('');
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    if (editIndex === index) {
      setEditIndex(null);
      setEditValue('');
    }
  };

  const handleRemoveCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
  };

  return (

    <main className='max-w-screen-md p-4 mx-auto' style={{ minHeight: 'calc(100vh - 116px)' }}>
      <div className="to-do-list-root border-solid border border-slate-300  rounded p-4">
        {!!todos?.length ? <h2 className="text-lg font-medium">To-Do Listing</h2> : null}
        <ul className={!!todos?.length ? 'mb-6' : null}>
          {todos.map((todo, index) => (
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
                <div className='flex'>
                  <p className={`w-2/3 hover:cursor-pointer ${todo.completed ? 'line-through text-gray-400' : null}`} onClick={() => handleToggleComplete(index)}>{todo.text}</p>
                  <div className='flex items-center w-1/3'>
                    <Button onClick={() => handleStartEdit(index)} btnText={'Edit'} />
                    <Button onClick={() => handleRemoveTodo(index)} btnText={'Delete'} />
                    <Button onClick={() => handleToggleComplete(index)} btnText={todo.completed ? 'Mark Incomplete' : 'Mark complete'} />
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
