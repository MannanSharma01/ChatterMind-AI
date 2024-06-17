import React from 'react';
import ReactDOM from 'react-dom/client'
import './css/index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./pages/Root.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Chat from "./pages/Chat.jsx";
import FrontendError from "./pages/FrontendError.jsx";
import { RootAuthorizationProvider } from './context/RootAuthorizationContext.jsx';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import {createTheme, ThemeProvider} from "@mui/material";

axios.defaults.baseURL = "https://localhost:5000/api/v1";    /** TO BE CHANGED */
axios.defaults.withCredentials = true;

const theme = createTheme({
    
    typography: {
      fontFamily: "Roboto slab, serif",
      allVariants: {
        color: "#f8f0f6",
        letterSpacing:"0.5px"
      }
    }
  }
);

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <RootAuthorizationProvider>
      <Root/>                   {/** the template for all other pages */}
    </RootAuthorizationProvider>,

    children: [
      {
        path: "home",
        element: <Home/>
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "signup",
        element: <Signup/>,
      },
      {
        path: "chat",
        element: <Chat/>,
      },
      {
        path: "*",
        element: <FrontendError/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Toaster position="top-center" toastOptions={{
        style: {
          fontFamily: "Roboto slab, serif",
          backgroundColor: "#f8f0f6"
        }
      }} />
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>,
)
