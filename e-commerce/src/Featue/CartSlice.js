import { createSlice } from "@reduxjs/toolkit"

const initialState ={
  cart:[],
  quantity:0,
  totalQuantity:0,
  totalPrice:0,
}

export const cardSlice = createSlice({
  name:"cart",
  initialState,
  reducers: {
    addToCart: (state,actions) => {
      state.cart.push(actions.payload)
    },
  },
})

export const { addToCart } = cardSlice.actions

export default cardSlice.reducer
