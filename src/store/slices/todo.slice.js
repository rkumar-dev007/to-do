
const initialState = {
    toDos: []
}

export const createToDoSlice = (set) => ({
    ...initialState,
    addTodo: (todo) => set((state) => ({ toDos: [...state.toDos, todo] })),
    editTodo: (id, newText) => set((state) => ({ toDos: state.toDos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)) })),
    toggleTodo: (id) => set((state) => ({ toDos: state.toDos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)) })),
    removeTodo: (id) => set((state) => ({ toDos: state.toDos.filter((todo) => todo.id !== id) })),
    handleRemoveCompleted: () => set((state) => ({ toDos: state.toDos.filter((todo) => !todo.completed) })),
    clearAll: () => set({ toDos: [] }),
    reorderToDos: (newState) => set({ toDos: newState }),
})