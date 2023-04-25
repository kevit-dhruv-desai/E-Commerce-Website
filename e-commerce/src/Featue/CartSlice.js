import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      const tempProduct = { ...actions.payload, quantity: 1 };
      const itemIndex = state.cart.findIndex(
        (item) => item.id === actions.payload.id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
      } else {
        state.cart.push(tempProduct);
      }
      state.totalQuantity += 1;
      state.totalPrice += actions.payload.price;
      state.totalPrice = Number(state.totalPrice.toFixed(2));
    },

    increaseQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cart[itemIndex].quantity += 1;
      state.totalQuantity += 1;

      state.totalPrice += action.payload.price;
      state.totalPrice = Number(state.totalPrice.toFixed(2));
    },

    decreaseQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= action.payload.price;
      } else {
        state.totalQuantity -= 1;
        state.totalPrice -=
          action.payload.price * state.cart[itemIndex].quantity;
        state.cart.splice(itemIndex, 1);
      }
      state.totalPrice = Number(state.totalPrice.toFixed(2));
    },

    removeFromCart: (state, action) => {
      const removedItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      state.totalQuantity -= removedItem.quantity;
      state.totalPrice -= removedItem.price * removedItem.quantity;
      state.totalPrice = Number(state.totalPrice.toFixed(2));
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
  cardSlice.actions;

export default cardSlice.reducer;
