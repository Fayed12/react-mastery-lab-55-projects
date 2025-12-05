import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// url
const API_URL = "http://localhost:5000/meals"

const initialState = {
    meals: [],
    status: "idle",
    error: null,
    cart: []
}

// get all meals from api
export const getAllMeals = createAsyncThunk("menue/getAllMeals", async () => {
    try {
        const res = await axios.get(API_URL)
        return res.data
    } catch (error) {
        return error
    }
})

const menueSlice = createSlice({
    name: "menue",
    initialState,
    reducers: {
        // payload === aboject of new meal
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },

        // payload === meal
        increaseQuantity: (state, action) => {
            const meal = state.cart.find(meal => meal.id === action.payload.id)
            if (meal) {
                meal.quantity++;
                meal.totalPrice = meal.price * meal.quantity;
            }
        },

        // payload === meal
        decreaseQuantity: (state, action) => {
            const meal = state.cart.find(meal => meal.id === action.payload.id)
            if (meal) {
                meal.quantity--;
                meal.totalPrice = meal.price * meal.quantity;

                if (meal.quantity === 0) {
                    menueSlice.caseReducers.removeFromCart(state, action)
                }
            }
        },

        // payload === meal
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(meal => meal.id !== action.payload.id)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMeals.pending, (state) => {
            state.status = "loading"
        }).addCase(getAllMeals.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.meals = action.payload
        }).addCase(getAllMeals.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error
        })
    }

})

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = menueSlice.actions
export default menueSlice.reducer

// get state value
export const getMeals = (state)=> state.menue.meals
export const getMealsStatus = (state)=> state.menue.status
export const getMealsError = (state) => state.menue.error
export const getAllCart = (state) => state.menue.cart
