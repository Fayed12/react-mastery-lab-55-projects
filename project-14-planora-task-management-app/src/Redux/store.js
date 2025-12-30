// local
import userReducer from "./authUserSlice"
import themeReducer from "./themeSlice"
import tasksReducer from "./tasksSlice"
import categoriesReducer from "./categoriesSlice"
import projectsReducer from "./projectsSlice"

// redux
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        tasks: tasksReducer,
        categories: categoriesReducer,
        projects:projectsReducer,
    }
})

export default store