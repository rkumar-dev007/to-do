import { useState } from 'react';
import { ReactSortable } from "react-sortablejs";
import Button from 'src/components/Button';
import TextInput from 'src/components/TextInput';
import { generateRandomString } from "src/helpers/randomStringGenerator";
import useTodoStore from 'src/store';

function TodoList() {
  const toDos = useTodoStore((state) => state.toDos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const handleRemoveCompleted = useTodoStore((state) => state.handleRemoveCompleted);
  const clearAll = useTodoStore((state) => state.clearAll);
  const reorderToDos = useTodoStore((state) => state.reorderToDos);

  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      addTodo({
        id: generateRandomString(6),
        text: inputValue,
        completed: false,
      });
      setInputValue('');
    }
  };

  const handleEdit = (id) => {
    const index = toDos.findIndex((toDo) => toDo.id === id);
    if (index !== -1 && !toDos[index].completed) {
      setEditId(id);
      setEditValue(toDos[index].text);
    }
  };

  const handleUpdate = (id) => {
    editTodo(id, editValue);
    setEditId('');
    setEditValue('');
  };


  const handleRemoveTodo = (id) => {
    removeTodo(id);
    if (editId === id) {
      setEditId('');
      setEditValue('');
    }
  };


  return (
    <main className='max-w-screen-md p-4 mx-auto' style={{ minHeight: 'calc(100vh - 116px)' }}>
      <div className="p-4 border border-solid rounded to-do-list-root border-slate-300">
        {!!toDos?.length ?
          <div className='flex items-center justify-between py-3'>
            <h2 className="text-lg font-medium">To-Do Listing</h2>
            <div className='flex'>
              <h3 className="px-2 mx-1 text-sm text-red-600 border border-red-600 border-solid rounded hover:text-white hover:bg-red-600 hover:cursor-pointer" onClick={handleRemoveCompleted}>Remove Completed</h3>
              <h3 className="px-2 mx-1 text-sm text-red-600 border border-red-600 border-solid rounded hover:text-white hover:bg-red-600 hover:cursor-pointer" onClick={clearAll}>Remove All</h3>
            </div>
          </div>
          : null
        }

        <ReactSortable list={toDos} setList={(newState) => reorderToDos(newState)} disabled={editId}>
          {toDos.map((toDo, index) => (
            <div key={toDo?.id} className='p-2 mb-1 border border-solid rounded border-slate-300'>
              {editId === toDo.id ? (
                <div className='flex'>
                  <TextInput
                    id={`existing-to-do-item-${toDo.id}`}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={'border-2 border-blue-600'}
                  />
                  <Button onClick={() => handleUpdate(toDo.id)} btnText={'Update'} />
                </div>
              ) : (
                <div className='flex flex-col md:flex-row'>
                  <p className={`md:w-2/3 hover:cursor-pointer ${toDo.completed ? 'line-through text-gray-400' : null}`} onClick={() => toggleTodo(toDo.id)}>{toDo.text}</p>
                  <div className='flex items-center justify-center my-3 md:w-1/3'>
                    <Button onClick={() => handleEdit(toDo.id)} btnText={'Edit'} className={toDo.completed ? 'disabled':null}/>
                    <Button onClick={() => handleRemoveTodo(toDo.id)} btnText={'Delete'} />
                    <Button onClick={() => toggleTodo(toDo.id)} btnText={toDo.completed ? 'Mark Incomplete' : 'Mark complete'} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </ReactSortable>

        <h3 className={`text-lg font-medium ${!!toDos?.length ? 'mt-6' : null}`}>Add new To-Do Item</h3>
        <div className='flex'>
          <TextInput
            id='new-to-do-item'
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your to-do"
          />
          <Button onClick={handleAddTodo} btnText={'Add'} />
        </div>
      </div>
    </main>

  );
}

export default TodoList;
