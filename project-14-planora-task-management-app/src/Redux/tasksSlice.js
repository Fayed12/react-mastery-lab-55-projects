// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasksData:null
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasksData: (state, action) => {
            state.tasksData = action.payload
        }
    }
})

export const {setTasksData} = tasksSlice.actions
export default tasksSlice.reducer;

// get data form slice
export const getTasksData = (state) => state.tasks.tasksData