// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeValue: sessionStorage.getItem("themeValue") || "light"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeToggle: (state, action) => {
            sessionStorage.setItem("themeValue", `${action.payload}`)
            state.themeValue = action.payload
        }
    }
})

export const { setThemeToggle } = themeSlice.actions
export default themeSlice.reducer

// get theme value
export const getThemeValue = (state) => state.theme.themeValue