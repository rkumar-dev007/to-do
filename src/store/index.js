import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createToDoSlice } from './slices/todo.slice';


const useTodoStore = create(
  persist((...a) => ({
    ...createToDoSlice(...a),
  }),
    {
      name: 'zustand:todos',
    }
  ),
)
export default useTodoStore