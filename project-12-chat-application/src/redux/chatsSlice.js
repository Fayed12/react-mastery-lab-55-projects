// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allContectedChats: [],
    currentChatId: null
}

const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setAllContectedChats: (state, action) => {
            state.allContectedChats = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        }
    }
})

export const { setAllContectedChats, setCurrentChatId } = chatsSlice.actions
export default chatsSlice.reducer


export const getAllContectedChats = (state) => state.chats.allContectedChats
export const getCurrentChatId = (state) => state.chats.currentChatId