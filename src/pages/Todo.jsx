import { useState } from 'react';
import { ReactSortable } from "react-sortablejs";
import Button from 'src/components/Button';
import HeroIcon from 'src/components/HeroIcon';
import TextInput from 'src/components/TextInput';
import { generateRandomString } from "src/helpers/randomStringGenerator";
import useTodoStore from 'src/store';
import { TrashIcon, PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import CustomDatePicker from 'src/components/CustomDatePicker';
import dayjs from 'dayjs';

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
  const [dueDate, setDueDate] = useState('');
  const [editDueDate, setEditDueDate] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      addTodo({
        id: generateRandomString(6),
        text: inputValue,
        completed: false,
        dueDate: dueDate
      });
      setInputValue('');
      setDueDate(null)
    }
  };

  const handleEdit = (id, dueDate) => {
    const index = toDos.findIndex((todo) => todo.id === id);
    if (index !== -1 && !toDos[index].completed) {
      setEditId(id);
      setEditValue(toDos[index].text);
      setEditDueDate(dueDate); // Set the editDueDate state to the existing due date
    }
  };


  const handleUpdate = (id) => {
    editTodo(id, editValue, editDueDate); // Pass the updated due date to the editTodo function
    setEditId('');
    setEditValue('');
    setEditDueDate(null);
  };


  const handleRemoveTodo = (id) => {
    removeTodo(id);
    if (editId === id) {
      setEditId('');
      setEditValue('');
      setEditDueDate(null); // Reset the editDueDate state if the edited todo is removed
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

        <ReactSortable list={toDos} setList={(newState) => reorderToDos(newState)} className='p-2 mb-1 border border-solid rounded border-slate-300'>
          {toDos.map((toDo, i) => (
            <div key={toDo?.id} className={`p-2 mb-1 border border-solid rounded border-slate-300 ${i % 2 === 0 ? 'bg-slate-200' : 'bg-slate-50'} hover:bg-slate-400`}>
              {editId === toDo.id ? (
                <div className='flex items-center'>
                  <TextInput
                    id={`existing-to-do-item-${toDo.id}`}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={'border-2 border-blue-600'}
                  />
                  <CustomDatePicker selected={editDueDate} onChange={(date) => setEditDueDate(date)} />
                  <Button onClick={() => handleUpdate(toDo.id)} btnText={'Update'} />
                </div>
              ) : (
                <div className={`flex items-center`}>
                  <p className={`md:w-8/12 hover:cursor-pointer ${toDo.completed ? 'line-through text-gray-400' : null}`} onClick={() => toggleTodo(toDo.id)}>{toDo.text}</p>
                  <div className='flex flex-col items-center justify-center my-3 md:flex-row md:w-4/12'>
                    <HeroIcon icon={PencilSquareIcon} color="#212121" onClick={() => handleEdit(toDo.id, toDo.dueDate)} className={`hover:cursor-pointer hover:scale-105 ${toDo.completed ? 'disabled' : null}`} />
                    <HeroIcon icon={TrashIcon} color="#DC2626" onClick={() => handleRemoveTodo(toDo.id)} className={`hover:cursor-pointer hover:scale-105`} />
                    <HeroIcon icon={CheckCircleIcon} color="#4BB543" onClick={() => toggleTodo(toDo.id)} className={`hover:cursor-pointer hover:scale-105`} />
                    <span className='p-1 text-xs font-medium text-white border border-solid rounded-full bg-sky-500'>{toDo?.dueDate ? dayjs(toDo.dueDate).format('DD-MM-YYYY') : 'No Due Date'}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </ReactSortable>

        <h3 className={`text-lg font-medium ${!!toDos?.length ? 'mt-6' : null}`}>Add new To-Do Item</h3>
        <div className='flex items-center'>
          <TextInput
            id='new-to-do-item'
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your to-do"
          />
          <div className='flex items-center'>
            <CustomDatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
            <Button onClick={handleAddTodo} btnText={'Add'} />
          </div>

        </div>
      </div>
    </main>

  );
}

export default TodoList;
