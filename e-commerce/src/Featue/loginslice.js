import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password:""
};

export const loginSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      emailInfo: (state,action)=>{
        state.email = action.payload
      },
      passwordInfo: (state,action)=>{
        state.password = action.payload
      }
    }
})

export const {emailInfo, passwordInfo} = loginSlice.actions;

export default loginSlice.reducer;
