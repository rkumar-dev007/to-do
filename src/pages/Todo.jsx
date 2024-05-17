import { BookmarkIcon, BookmarkSlashIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useState } from 'react';
import { ReactSortable } from "react-sortablejs";
import HeroIcon from 'src/components/HeroIcon';
import { generateRandomString } from 'src/helpers/randomStringGenerator';
import useTodoStore from 'src/store';
import { YUP } from 'src/utils/yup.schema';
import * as Yup from "yup";
import ToDoForm from './ToDoForm';
import React from 'react';

function TodoList() {
  const toDos = useTodoStore((state) => state.toDos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const handleRemoveCompleted = useTodoStore((state) => state.handleRemoveCompleted);
  const clearAll = useTodoStore((state) => state.clearAll);
  const reorderToDos = useTodoStore((state) => state.reorderToDos);

  const initialValues = {
    id: null,
    text: '',
    completed: false,
    priority: 'low',
    createdAt: new Date(),
    dueDate: new Date()
  };
  const [editId, setEditId] = useState(null);
  const handleEdit = (id) => { setEditId(id); };

  const validationSchema = Yup.object().shape({
    text: YUP.text,
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('values: ', values);
    if (editId) {
      editTodo(values)
      setEditId(null);
    } else {
      addTodo({ ...values, id: values?.id ?? generateRandomString(6) });
      resetForm();
    }
  };

  return (
    <main className='max-w-screen-lg p-4 mx-auto' style={{ minHeight: 'calc(100vh - 116px)' }}>
      <div className='px-2 py-2 bg-gray-200 rounded' >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {props => <ToDoForm {...props} />}
        </Formik>
      </div>
      {!!toDos?.length ?
        <div className='flex items-center justify-end mt-4 mb-1'>
          <h3 className="px-2 mx-1 text-sm text-red-600 border border-red-600 border-solid rounded hover:text-white hover:bg-red-600 hover:cursor-pointer" onClick={handleRemoveCompleted}>Remove Completed</h3>
          <h3 className="px-2 mx-1 text-sm text-red-600 border border-red-600 border-solid rounded hover:text-white hover:bg-red-600 hover:cursor-pointer" onClick={clearAll}>Remove All</h3>
        </div> : null}

      <div className="p-4 border border-solid rounded to-do-list-root border-slate-300">
        {!!toDos?.length ?
          <ReactSortable list={toDos} setList={(newState) => reorderToDos(newState)} className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {toDos.map((toDo, i) => (
              <div key={toDo?.id} className={`min-h-40 border border-solid rounded border-slate-200`}>
                {editId === toDo.id ? (
                  <Formik
                    initialValues={{ ...initialValues, ...toDo }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {props => <ToDoForm {...props} />}
                  </Formik>
                ) : (
                  <div className={`flex flex-col h-full justify-between ${toDo.completed ? 'bg-green-50' : 'bg-zinc-200'} `}>
                    <div className='flex items-center justify-end mt-2 mb-3'>
                      <span className='p-1 text-xs font-medium text-white border border-solid rounded-lg bg-sky-500'>{toDo?.dueDate ? dayjs(toDo.dueDate).format('DD-MM-YYYY') : 'No Due Date'}</span>
                      <span className='p-1 text-xs font-medium text-white border border-solid rounded-lg bg-sky-500'>{toDo?.priority}</span>
                      {!toDo.completed ? <HeroIcon icon={PencilSquareIcon} color="#212121" onClick={() => handleEdit(toDo.id, toDo.dueDate)} className={`hover:cursor-pointer hover:scale-105`} /> : null}
                      <HeroIcon icon={TrashIcon} color="#DC2626" onClick={() => removeTodo(toDo.id)} className={`hover:cursor-pointer hover:scale-105`} />
                      <HeroIcon icon={toDo.completed ? BookmarkIcon : BookmarkSlashIcon} color={toDo.completed ? "#4BB543" : '#FF9100'} onClick={() => toggleTodo(toDo.id)} className={`hover:cursor-pointer hover:scale-105`} />
                    </div>
                    <p className={` hover:cursor-pointer min-h-28 m-3  p-2  ${toDo.completed ? 'line-through text-slate-500' : null}`} onClick={() => toggleTodo(toDo.id)}>{toDo.text}</p>
                  </div>
                )}
              </div>
            ))}
          </ReactSortable>
          :
          <div className="flex items-center justify-center min-h-80">
            <h3 className="font-medium">No To-Do Item</h3>
          </div>
        }
      </div>
    </main>
  );
}

export default TodoList;
