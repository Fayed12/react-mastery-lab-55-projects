// redux
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import themeReducer from "./themeSlice"
import usersReducer from "./usersSlice"
import chatsReducer from "./chatsSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        users: usersReducer,
        chats: chatsReducer
    }
}) 

export default store;