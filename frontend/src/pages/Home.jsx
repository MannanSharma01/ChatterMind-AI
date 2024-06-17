import { Box, Typography } from "@mui/material";
import TypeAnim from "../components/TypeAnim.jsx";

export default function Home() {
  return (                  // client sabse pehle yaha pe aayega
    <Box sx={{        // a block html-element. iski height and width property, maine khud se set nahi kari
      px: "20px",
      pb: "15px"
    }}>
      <Typography variant="h1" sx={{
        // border: "2px solid red",
        height: "270px",
        // width: "2000px",
        width: "1000px",
        "@media(max-width:1059.98px)": {          // at vw BETWEEN 1059.98px and 1060px, both will show. But such a vw can not be acchieved
          display: "none"
        }
      }}>
        <TypeAnim/>
      </Typography>

      <Typography variant="h2" sx={{
        // border: "2px solid red",
        height: "180px",
        width: "638px",
        mb: "50px",
        "@media(min-width:1060px) or (max-width:688px)": {
          display: "none"
        }
      }}>
        <TypeAnim/>
      </Typography>

      <Typography variant="h3" sx={{
        // border: "2px solid red",
        height: "160px",
        width: "508px",
        mb: "30px",
        "@media(min-width:688.02px) or (max-width:560px)": {
          display: "none"
        }
      }}>
        <TypeAnim/>
      </Typography>

      <Typography variant="h3" sx={{
        // border: "2px solid red",
        height: "250px",
        width: "300px",
        mb: "20px",
        "@media(min-width:560.02px)": {
          display: "none"
        },
        "@media(max-width: 376px)": {
          width: "100%",
          height: "300px",
          wordBreak: "break-word",
          hyphens: "auto",
        },
        "@media(max-width: 292px)": {
          height: "350px",
        },
        "@media(max-width: 228px)": {
          height: "400px",
        },
        "@media(max-width: 212px)": {
          height: "auto",
        }
      }}>
        <TypeAnim/>
      </Typography>

      <Box sx={{
        // border: "2px solid white",
        height: "270px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",
        "@media(max-width:1024px)": {
          justifyContent: "flex-start"
        },
        "@media(max-width:848px)": {
          height: "320px",
          justifyContent: "center",
          alignItems: "center"
        },

        "@media(max-width:560.02px)": {
          height: "280px",
          display: "block",
          width: "100%"
        }
      }}>
        <img src="/chat-pic.png" id="home-page-chat-img" style={{
          width: "400px",
          height: "246.700px",
          borderRadius: "20px",
        }}/>

        <img src="/robot.png" id="home-page-light-robot" style={{
          height: "600px",
          width: "661.763px",
          opacity: "0.08",
          // border: "3px solid white"
        }}/>

      </Box>
    </Box>
  );
}