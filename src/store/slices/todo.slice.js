
const initialState = {
    toDos: []
}

export const createToDoSlice = (set) => ({
    ...initialState,
    addTodo: (toDo) => set((state) => ({ toDos: [...state.toDos, toDo] })),
    editTodo: (index, toDo) =>
        set((state) => ({
            toDos: state.toDos.map((t, i) => (i === index ? { ...t, text: toDo } : t)),
        })),
    toggleTodo: (index) =>
        set((state) => ({
            toDos: state.toDos.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t)),
        })),
    removeTodo: (index) => set((state) => ({ toDos: state.toDos.filter((_, i) => i !== index) })),
    handleRemoveCompleted: () =>
        set((state) => ({
            toDos: state.toDos.filter(todo => !todo.completed),
        })),
    clearAll: () => { set(initialState); }
})