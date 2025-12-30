// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectsData: null
}

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjectsData: (state, action) => {
            state.projectsData = action.payload
        }
    }
})

export const { setProjectsData } = projectsSlice.actions
export default projectsSlice.reducer;

// get data form slice
export const getProjectsData = (state) => state.projects.projectsData