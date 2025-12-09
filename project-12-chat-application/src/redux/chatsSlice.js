// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allContectedChats: [],
    currentChatId: null,
    currentChatMessages: null,
    isThereIsChat: false
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
        },
        setCurrentChatMessages: (state, action) => {
            state.currentChatMessages = action.payload
        },
        setIsThereIsChat: (state, action) => {
            state.isThereIsChat = action.payload
        }
    }
})

export const { setAllContectedChats, setCurrentChatId, setCurrentChatMessages, setIsThereIsChat } = chatsSlice.actions
export default chatsSlice.reducer


export const getAllContectedChats = (state) => state.chats.allContectedChats
export const getCurrentChatId = (state) => state.chats.currentChatId
export const getCurrentChatMessages = (state) => state.chats.currentChatMessages
export const getIsThereIsChat = (state) => state.chats.isThereIsChat