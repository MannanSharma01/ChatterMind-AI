import { useEffect, useState } from "react"
import { useAuthorizationData } from "../context/RootAuthorizationContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import InputIcon from '@mui/icons-material/Input';
import Input from "../components/shared/Input.jsx";

export default function Signup() {

  const {signup, isLoggedIn} = useAuthorizationData();
  const navigate = useNavigate();

  let [userEntry, setUserEntry] = useState({username: "", password: "", email: ""});

  function handleChange(evt) {
    setUserEntry({...userEntry, [evt.target.name]: evt.target.value});
  }

  async function handleSubmission(evt) {
    evt.preventDefault();
    let result = await signup(userEntry);
    if(result === "successful") {
      toast.success("Signed Up Successfully !");
      navigate("/home");
    } else {
      toast.error(result);
      setUserEntry({username: "", password: "", email: ""});
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
        onSubmit={handleSubmission} 
        sx={{
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
          padding: "30px 0", 
          alignSelf: "center",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          boxShadow: "0px 5px 5px -3px rgba(248, 240, 246,0.2), 0px 8px 10px 1px rgba(248, 240, 246,0.14),0px 3px 14px 2px rgba(248, 240, 246,0.12)",
          borderRadius: "20px"
        }}>
        <Typography variant="h4" sx={{mb: "30px"}}>
          SIGNUP
        </Typography>
        <Input type="text" name="username" label="Username" value={userEntry.username} onChange={handleChange} extra={{width: "80%", marginBottom: "30px"}}/>
        <Input type="password" name="password" label="Password" value={userEntry.password} onChange={handleChange} extra={{width: "80%", marginBottom: "30px"}}/>
        <Input type="text" name="email" label="Email" value={userEntry.email} onChange={handleChange} extra={{width: "80%", marginBottom: "30px"}}/>
        <Button 
          variant="outlined"
          type="submit"
          size="large"
          endIcon={<InputIcon/>}
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
          Signup
        </Button>
      </Box>

    </Container>
  )
}