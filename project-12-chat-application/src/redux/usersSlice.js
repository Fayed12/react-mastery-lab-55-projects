// redux
import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    users: null,
    status: "idle",
    AllAppUsers: null,
    loginUser: null,
}

const usersSlice = createSlice({
    name: "user",
    initialState: initialValues,
    reducers: {
        setContectedUsers: (state, action) => {
            state.status = "succeeded"
            state.users = action.payload
        },
        clearContectedUsers: (state) => {
            state.status = "idle"
            state.users = null
        },
        loadingContectedUsers: (state) => {
            state.status = "loading"
        },
        setAllAppUsers: (state, action) => {
            state.status = "succeeded"
            state.AllAppUsers = action.payload
        },
        clearAllAppUsers: (state) => {
            state.status = "idle"
            state.AllAppUsers = null
        },
        setLoginUser: (state, action) => {
            state.status = "succeeded"
            state.loginUser = action.payload
        },
        clearLoginUser: (state) => {
            state.status = "idle"
            state.loginUser = null
        },
    }
})

export const { setContectedUsers, clearContectedUsers, loadingContectedUsers, setAllAppUsers, clearAllAppUsers, setLoginUser, clearLoginUser } = usersSlice.actions

export default usersSlice.reducer

export const getContectedUsersData = (state) => state.users.users
export const getLoading = (state)=> state.users.status
export const getAllAppUsersData = (state)=> state.users.AllAppUsers
export const getLoginUserData = (state)=> state.users.loginUser

