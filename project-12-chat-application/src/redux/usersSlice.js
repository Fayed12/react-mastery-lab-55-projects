// redux
import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    users: null,
    status: "idle",
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
        }
    }
})

export const { setContectedUsers, clearContectedUsers, loadingContectedUsers } = usersSlice.actions
export default usersSlice.reducer

export const getContectedUsersData = (state) => state.users.users
export const getLoading = (state)=> state.users.status

