import { useEffect, useState } from "react";
import { allChatsRequest, deleteChatsRequest, newChatRequest } from "../helpers/backend-server-request-send";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AllChatsShow from "../components/chat-related/AllChatsShow.jsx";
import { Box, Typography, Avatar, Button, IconButton } from "@mui/material";
import { useAuthorizationData } from "../context/RootAuthorizationContext.jsx";
import SendIcon from '@mui/icons-material/Send';


export default function Chat() {

  const navigate = useNavigate();

  let [allChats, setAllChats] = useState([]);
  const [userEntry, setUserEntry] = useState("");

  let {user} = useAuthorizationData();
  // console.log(user);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if(userEntry.trim().length !== 0) {         // (client-side-validation)
      const response = await newChatRequest({content: evt.target.children[0].value});
      if(response.status === 200) {
        setAllChats(response.data);
        setUserEntry("");
      } else {
        toast.error(response.data);
      }
    }
  }

  function handleDeleteBtn() {
    if(!allChats.length) {
      toast.error("No chats to delete!")
    } else {
      const promiseObject = deleteChatsRequest();
      // console.log("promiseObject---", promiseObject);    // (pending state)
      toast.promise(promiseObject, {
        loading: "Deleting Chats",
        success: () => {
          setAllChats([]);
          // console.log("promiseObject---", promiseObject);    // (fulfilled state)
          return "All chats deleted successfully !";
        },
        error: "You must be logged-in to perform this action"
      });
    }
    
  }

  function handleChange(evt) {
    setUserEntry(evt.target.value);
  }

  
  useEffect( () => {
    async function getallChats() {
      const response = await allChatsRequest();
      if(response.status === 200) setAllChats(response.data);
      else {
        navigate("/home");
        toast.error("You must be logged-in as a user, to chat.");      // ((chahe simply response.data likhdo. (agar control yaha pe aa raha hai---response.data bas-'-you must be logged in to perfrom this action' hi ho skta hai ) ))
      }
      
    }
    getallChats();
  }, []);

  return (
    <Box        // a div html-element----- a 'block' html-element.
      id="main"
      sx={{
        // border: "2px solid white",
        padding: "0px 20px 20px 20px",
        // height: "calc(100vh - 130px - 3.2px)",     // in the end, when remove border, also remove -3.2px from here

        display: "flex"           // now display property of this html-element, set to----'block'-flex   // we are not setting its width property on our own. // also, we are not setting its height property on our own---(so automatically, its height property set, st. is element ka content-box ki lambai, is element ke content se, ek-dum chipak ke)
      }}
    >
      <Box 
      id="left"
      sx={{
        width: "310px",
        height: "380px",
        pt: "15px",
        bgcolor: "rgb(17,29,39)",
        borderRadius: "20px",
        "@media(max-width:900px)": {
          width: "250px",
          height: "420px"
        },
        "@media(max-width:800px)": {
          display: "none"
        },
        mr: "30px",
        flexShrink: "0",

        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Avatar sx={{
          width: "47px",
          height: "47px",
          fontWeight: "700",
          fontSize: "23px",
          mb: "15px",
          bgcolor: "#f8f0f6",
          color: "#061424"
        }}>
          {user ? user.username[0].toUpperCase() : ""}
        </Avatar>

        <Typography sx={{
          textAlign: "center",
          mb: "50px"
        }}>
          You are talking to an AI ChatBOT.
        </Typography>

        <Typography 
        sx={{
          textAlign: "center",
          mb: "65px"
        }}>
          You can ask questions related to Knowledge, Business, Advices,
          Education, etc. But avoid sharing personal information.
        </Typography>

        <Button onClick={handleDeleteBtn} sx={{
          bgcolor: "#ff2d2de0",
          "&:hover": {
            bgcolor: "#ff2d2df5"
          },
          color: "#f8f0f6",
          borderRadius: "20px",
          padding: "10px 14px"
        }}>
          Delete All Chats
        </Button>
      </Box>

      <Box          // a flex-item
        id="right"
        sx={{
          width: "5000px",
          height: "550px",
          // border: "2px solid white",
          flexShrink: "1",

          display: "flex",
          flexDirection: "column"
        }}>
        <Typography variant="h4"
          sx={{                    // we are not setting the height and width property of this 'block' element.
            textAlign: "center",
            mb: "20px"
          }}>
          Let's Talk !
        </Typography>

        <AllChatsShow AllChats={allChats}/>

        <Box component="form"
        sx={{         // we are not setting the width property of this form html-element (a block element)
          height: "50px",
          // border: "2px solid white",
          mt: "auto",
          bgcolor: "rgb(17,29,39)",
          display: "flex",
          borderRadius: "15px",
          pr: "5px",
          pl: "17px"
        }}
        onSubmit={handleSubmit}
        >
          <input type="text" onChange={handleChange} value={userEntry} placeholder="Message" style={{
            height: "48px",
            width: "94%",
            border: "none",
            outline: "none",
            flexShrink: "1",
            fontFamily: "Roboto slab, serif",
            fontSize: "18px",
            backgroundColor: "transparent",
            color: "#f8f0f6"
          }}/>
          <IconButton
          type="submit"
          sx={{
            color: "#f8f0f6",
            ml: "auto",
            flexShrink: "0"
          }}>
            <SendIcon sx={{
              width: "26px",
              height: "26px"
            }}/>
          </IconButton>
        </Box>

      </Box>

    </Box>
  );
}