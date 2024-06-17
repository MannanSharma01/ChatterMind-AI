import { useEffect, useState } from "react";
import { useAuthorizationData } from "../context/RootAuthorizationContext";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Container, Button, Typography } from "@mui/material";
import Input from "../components/shared/Input.jsx";
import LoginIcon from '@mui/icons-material/Login';

export default function Login() {

  let {login, isLoggedIn} = useAuthorizationData();
  let navigate = useNavigate();

  const [userEntry, setUserEntry] = useState({username: "", password: ""});

  function handleUserEntry(event) {
    setUserEntry({ ...userEntry, [event.target.name]: event.target.value  });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(userEntry);
    if(result==="successful") {
      toast.success("Logged In Successfully !");
      navigate("/home");
    } else {
      toast.error(result);
      setUserEntry({username: "", password: ""});
    } 
  }

  useEffect(() => {         // client-side-validation (protected-route)
    if(isLoggedIn) {
      navigate("/home");
      toast.error("You are already logged in !");
    }
  });


  return (
    <Container sx={{
      display: "flex",
      "@media(min-width:752px)": {
        justifyContent: "space-between"
      },
      "@media(max-width:752px)": {
        justifyContent: "center"
      }
    }}>
      <img src="/airobot-Recovered.png" className="login-signup-page-robot-image"/>

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{
          // height: "300px",
          "@media(min-width:900px)": {
            width: "35vw"
          },
          "@media(max-width:900px) and (min-width:752px)": {
            width: "45vw"
          },
          "@media(max-width:752px) and (min-width:424px)": {
            width: "80%",
            mt: "65px"
          },
          "@media(max-width:424px)": {
            width: "100%",
            mt: "65px"
          },
          // border: "3px solid white",    // pehle isko sara time ye diya hua tha, ab end me hata raha hu
          padding: "30px 0", 
          alignSelf: "center",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxShadow: "0px 5px 5px -3px rgba(248, 240, 246,0.2), 0px 8px 10px 1px rgba(248, 240, 246,0.14),0px 3px 14px 2px rgba(248, 240, 246,0.12)",
          borderRadius: "20px"
        }}>
        <Typography variant="h4" sx={{mb: "30px"}}>
          LOGIN
        </Typography>
        <Input type="text" name="username" label="Username" value={userEntry.username} onChange={handleUserEntry} extra={{width: "80%", marginBottom: "30px"}}/>
        <Input type="password" name="password" label="Password" value={userEntry.password} onChange={handleUserEntry} extra={{width: "80%", marginBottom: "30px"}}/>
        <Button 
          variant="outlined"
          type="submit"
          size="large"
          endIcon={<LoginIcon/>}
          sx={{
            color: "rgb(248, 240, 246)",
            border: "1px solid rgba(248, 240, 246, 0.4)",
            borderRadius: "8px",
            transition: "0.15s linear",
            "&:hover": {
              color: "rgb(248, 240, 246)",
              border: "1px solid rgb(248, 240, 246)",
              borderRadius: "8px",
            }
          }}
        >
          LOGIN
        </Button>
      </Box>

    </Container>
  );
}