import { Link } from "react-router-dom"
import { useAuthorizationData } from "../../context/RootAuthorizationContext"
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import Logo from "./Logo.jsx";
import NavigationButton from "./NavigationButton.jsx";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";


export default function Header() {
  let authInfo = useAuthorizationData();

  const [anchorEl, setAnchorEl] = useState(null);

  const shouldBeOpen = Boolean(anchorEl);

  function openMenu(event) {
    setAnchorEl(event.target);
  }
  function closeMenu() {
    setAnchorEl(null);
  }

  return (
    <AppBar sx={{
      position: "fixed",
      backgroundColor: "#061424",
      boxShadow: "0 2px 8px rgba(248, 240, 246, 0.5)",
      "&:hover": {
        boxShadow: "0 2px 14px rgba(248, 240, 246, 0.5)"
      }
      }}>           {/** pehle sara time--yaha pe backroundColor: "#061424" nahi likha hua tha, and boxShadow--none set kara hua tha */}
      <Toolbar sx={{height: "77px"}}>     {/**pehle sara time ye bhi likha hua tha yaha pe---border:"3px solid red" */}

        <Logo/>
        <a href="https://chattermind-ai.onrender.com/abc" style={{color: "white"}}>go</a>
        <Link to="/home" className="header-title">
          <Typography variant="h5" sx={{fontWeight: "400", display:"inline-block"}}>
            ChatterMind AI
          </Typography>
        </Link>

        {
          !authInfo.isLoggedIn ?
          <Box sx={{ ml: "auto", display:{xs: "none", sm: "initial"} }}>
            <NavigationButton to="/login" bgColor="#00fffc" textColor="black" extra={{marginRight: "20px"}} >LOGIN</NavigationButton>
            <NavigationButton to="/signup" bgColor="#51538f" textColor="white" >SIGNUP</NavigationButton>
          </Box> :
          <Box sx={{ml: "auto", display:{xs: "none", sm: "initial"}}}>
            <NavigationButton to="/chat" bgColor="#00fffc" textColor="black" extra={{marginRight: "20px"}} >CHAT</NavigationButton>
            <NavigationButton bgColor="#51538f" textColor="white" onClickFn={authInfo.logout}>LOGOUT</NavigationButton>
          </Box>
        }

        <IconButton sx={{ display:{xs: "inline-block", sm: "none"}, ml: "auto", height: "52px" }} onClick={openMenu}>
          <MenuIcon sx={{fontSize: "36px", color: "#f8f0f6"}}/>
        </IconButton>


        <Menu anchorEl={anchorEl} open={shouldBeOpen} onClose={closeMenu} sx={{ 
          display: {xs: "initial", sm: "none"}, 
          ".MuiPaper-root": { 
            backgroundColor: "#061424", 
            boxShadow: "0px 5px 5px -3px rgba(248, 240, 246,0.2), 0px 8px 10px 1px rgba(248, 240, 246,0.14),0px 3px 14px 2px rgba(248, 240, 246,0.12)",
            cursor: "default"
          }, 
          ".MuiMenuItem-root": {
            cursor: "default"
          }
        }}>
          {
            !authInfo.isLoggedIn ?
            [
              <MenuItem onClick={closeMenu} key="login">
                <NavigationButton to="/login" bgColor="#00fffc" textColor="black">LOGIN</NavigationButton>
              </MenuItem>,

              <MenuItem onClick={closeMenu} key="signup">
                <NavigationButton to="/signup" bgColor="#51538f" textColor="white" >SIGNUP</NavigationButton>
              </MenuItem>
            ]
            :
            [
              <MenuItem onClick={closeMenu} key="chat">
                <NavigationButton to="/chat" bgColor="#00fffc" textColor="black" extra={{marginRight: "20px"}} >CHAT</NavigationButton>
              </MenuItem>,

              <MenuItem onClick={closeMenu} key="logout">
                <NavigationButton bgColor="#51538f" textColor="white" onClickFn={authInfo.logout}>LOGOUT</NavigationButton>
              </MenuItem>
            ]
          }
        </Menu>

      </Toolbar>
    </AppBar>
  );
}