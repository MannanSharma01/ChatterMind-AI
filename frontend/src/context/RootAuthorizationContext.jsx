import { createContext, useContext, useEffect, useState } from "react";
import {authStatusRequest, loginRequest, logoutRequest, signupRequest} from "../helpers/backend-server-request-send.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RootAuthorizationContext = createContext();

export function RootAuthorizationProvider({children}) {     // to all the components, of the----hierarchy with the top-most component as the 'Root' component---we want to provide 'this' data----if the client is logged in as a user or not

  const navigate = useNavigate();

  let [user, setUser] = useState(null);
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  // console.log("RootAuthorizationProvider:", user);

  const signup = async function(data) {
    let response = await signupRequest(data);
    if(response.status===200) {
      setIsLoggedIn(true);
      setUser(response.data);
      return "successful"
    } else {
      return response.data;
    }
  };

  const login = async function(data) {
    let response = await loginRequest(data);
    if(response.status === 200) {
      setIsLoggedIn(true);
      setUser(response.data);
      return "successful";
    } else {
      return response.data;
    }
  };

  const logout = async function() {
    let response = await logoutRequest();
    if(response.status === 200) {
      setIsLoggedIn(false);
      setUser(null);
      navigate("/home");
      toast.success("Logged Out Successfully !");
    } else {
      toast.error(response.data);
    }
    
    
  };

  const value = {
    user, isLoggedIn, signup, login, logout
  };

  useEffect( function () {
    async function initialAuthStatusCheck () {
      // console.log("useEffect of RootAuthorizationContext.jsx--");
      let result = await authStatusRequest();
      if(typeof result !== "string") {
        setIsLoggedIn(true);
        setUser(result);
      }
    }
    initialAuthStatusCheck();
  }, [] );

  return (
    <RootAuthorizationContext.Provider value={value}>
      {children}
    </RootAuthorizationContext.Provider>
  )
}

export function useAuthorizationData() {
  return useContext(RootAuthorizationContext);
}