// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataStatus: "",
    userDetails: null,
    allUsers: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDataLoading: (state) => {
            state.dataStatus = "loading"
        },
        setUserData: (state, action) => {
            state.dataStatus = "fulfilled",
                state.userDetails = action.payload
        },
        setDataError: (state) => {
            state.dataStatus = "error"
        },
        setAllUsersData: (state, action) => {
            state.allUsers = action.payload
        },
    }
})

export const { setUserData, setDataError, setDataLoading,setAllUsersData } = userSlice.actions
export default userSlice.reducer

// fetch data in one place 
export const getUserDetails = (state) => state.user.userDetails
export const getAllUsersData = (state) => state.user.allUsers
