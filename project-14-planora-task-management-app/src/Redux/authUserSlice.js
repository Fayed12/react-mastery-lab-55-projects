// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataStatus: "",
    userDetails: null
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
        }
    }
})

export const {setUserData, setDataError, setDataLoading} = userSlice.actions
export default userSlice.reducer

// fetch data in one place 
export const getUserDetails =(state)=>state.user.userDetails
