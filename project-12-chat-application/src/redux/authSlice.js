// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        setLoading: (state,action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.isLoading;

