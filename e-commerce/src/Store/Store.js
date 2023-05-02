import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../Featue/CartSlice";
import loginslice from "../Featue/loginslice";

const store = configureStore({
    reducer: {
      allCart:cardSlice,
      logininfo:loginslice
    }
  })
  
  export default store;