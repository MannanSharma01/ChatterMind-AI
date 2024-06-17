import { Box, Typography } from "@mui/material";

export default function FrontendError() {
  return (
    <Box sx={{
      px: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      "@media(max-width: 737.6px)": {
        alignItems: "flex-start"
      },
      "@media(max-width: 700px)": {
        height: "540px",
        flexDirection: "column",
        alignItems: "center",
      }
    }}>
      <Typography variant="h2" sx={{
        height: "200px",
        "@media(max-width: 552px)": {
          fontSize: "40px"
        },
        "@media(max-width: 300px)": {
          fontSize: "30px",
          height: "100px"
        }
      }}>  
        OOPS !! <br />
        NO SUCH PAGE FOUND.
      </Typography>

      <img src="/robott.png" className="error-robot" style={{
        width: "300px",
        height: "360px"
      }}/>
    </Box>
  );
}