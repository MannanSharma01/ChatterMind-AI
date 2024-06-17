import { Box, Typography, Avatar } from "@mui/material";
import AssistantChat from "./AssistantChat.jsx";
import { v4 as uuidv4 } from 'uuid';
import { useAuthorizationData } from "../../context/RootAuthorizationContext.jsx";

export default function AllChatsShow({AllChats: allChats}) {

  let {user} = useAuthorizationData();

  return (
    <Box id="all-chats-show" sx={{        // we are not setting the width property of this div html-element (a block element)
      height: "400px",
      // border: "2px solid white",
      overflowY: "auto",
      pr: "15px"
    }}>

      {
        !allChats.length ?

          <Typography sx={{      // a block html-element
            textAlign: "center"
          }}>
            No Chats Yet
          </Typography> 
          :
          allChats.map( (el) => {
            if(el.role === "user") {
              return (
                <Box key={uuidv4()} sx={{ 
                  // border: "2px solid white",    // this is a block html-element. we are ourselves, not setting its height and width property.   
                  display: "flex",
                  mb: "15px",
                  bgcolor: "#004d56",
                  borderRadius: "15px",
                  p: "10px"
                }}>
                  <Avatar sx={{
                    fontSize: "20px",
                    fontWeight: "500",
                    mr: "15px",
                    bgcolor: "#f8f0f6",
                    color: "#061424"
                  }}>
                    {user ? user.username[0].toUpperCase() : ""}
                  </Avatar>
              
                  <Typography sx={{   // is html-element ka display is 'flex-item'------maine iski height and width property, khud se, set nahi kari hai
                    wordBreak: "break-word"
                  }}>       
                    {el.content}
                  </Typography>
                </Box>
              );
            } else {
              return (
                <AssistantChat aChat={el} key={uuidv4()}/>
              );
            }
          } )
      }
    </Box>
  );
}