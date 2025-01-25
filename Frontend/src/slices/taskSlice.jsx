import { createSlice} from '@reduxjs/toolkit';

const initialState = {

    allTasks: [],
    editTask : false,
    task: [],
    completedTasks: [],
    pendingTasks: [],
    ImportantTasks : [],
}

const taskSlice = createSlice({

    name: 'task',
    initialState,
    reducers: {
        
        setAllTasks: (state, action) => {
            state.allTasks = action.payload
        },
        setEditTask: (state, action) => {
            state.editTask = action.payload
        },
        setTask: (state, action) => {
            state.task = action.payload
        },
        setCompletedTasks: (state, action) => {
            state.completedTasks = action.payload
        },
        setPendingTasks: (state, action) => {
            state.pendingTasks = action.payload
        },
        setImportantTasks: (state, action) => {
            state.ImportantTasks = action.payload
        },
    }

})

export const { setAllTasks, setTask,setEditTask, setCompletedTasks, setPendingTasks, setImportantTasks } = taskSlice.actions

export default taskSlice.reducer;