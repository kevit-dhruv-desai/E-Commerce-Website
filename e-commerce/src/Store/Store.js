import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../Featue/CartSlice";

const store = configureStore({
    reducer: {
      allCart:cardSlice
    }
  })
  
  export default store;