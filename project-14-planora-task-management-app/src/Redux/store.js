// local
import userReducer from "./authUserSlice"
import themeReducer from "./themeSlice"

// redux
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        user: userReducer,
        theme:themeReducer,
    }
})

export default store