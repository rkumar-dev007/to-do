import React, { useState } from 'react';

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
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
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

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  const handleSaveEdit = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = editValue;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <main>
      <h2 className="text-xl font-bold text-rose-600">To-Do Application</h2>
  
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your to-do"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {todo}
                <button onClick={() => handleEditTodo(index)}>Edit</button>
                <button onClick={() => handleRemoveTodo(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default TodoList;
