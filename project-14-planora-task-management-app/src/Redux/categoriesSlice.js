// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoriesData: null
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategoriesData: (state, action) => {
            state.categoriesData = action.payload
        }
    }
})

export const { setCategoriesData } = categoriesSlice.actions
export default categoriesSlice.reducer;

// get data form slice
export const getCategoriesData = (state) => state.categories.categoriesData