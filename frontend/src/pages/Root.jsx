import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header-related/Header.jsx";
import { useEffect } from "react";


export default function Root() {        // this is the template for all other pages

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === "/") {
      navigate("/home");
    }
  });

  return (              
    <div id="Template">         
      <Header/>
      <a href="https://chattermind-ai.onrender.com/abc">go</a>
      <Outlet/>
    </div>
  )
};