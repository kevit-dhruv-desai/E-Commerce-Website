import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Component/Pages/PageComponet/Login";
import SignUp from "./Component/Pages/PageComponet/SignUp";
import ProductList from "./Component/Pages/PageComponet/ProductList";
import store from './Store/Store'
import {Provider} from 'react-redux'

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Login/> },
    { path: "signup", element: <SignUp /> },
    { path: "ProductList", element: <ProductList/> }
  ]);
  return <Provider store={store}> <RouterProvider router={router} /></Provider>;
}

export default App;
