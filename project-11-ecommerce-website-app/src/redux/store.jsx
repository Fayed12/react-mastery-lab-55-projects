import { configureStore } from "@reduxjs/toolkit";
import menueReducer from "./menuSlice"

const store = configureStore({
    reducer: {
        menue: menueReducer
    }
})

export default store
