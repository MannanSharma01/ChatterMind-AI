import { Avatar, Typography, Box } from "@mui/material";
import { codeBlockExists, extractBlocks, findLanguage } from "../../helpers/code-block.js";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { v4 as uuidv4 } from 'uuid';


export default function AssistantChat({aChat, uniqueKey}) {

  return (
    <Box key={uniqueKey} sx={{              // a block html-element
      // border: "2px solid white",
      display: "flex",
      mb: "15px",
      bgcolor: "#1043493d",
      borderRadius: "15px",
      p: "10px"
    }}>
      <Avatar src="/openai.png" sx={{
        bgcolor: "#f8f0f6",
        mr: "15px",
        ".MuiAvatar-img": {
          width: "30px",
          height: "30px"
        }
      }}
      />
      {
        !codeBlockExists(aChat.content) ?
        <Typography sx={{
          wordBreak: "break-word"
        }}>
          {aChat.content}
        </Typography> 
        :
        <Box> 
        {                     // a flex-item----'we' are not setting its height and width property. --- height and width automatically set by the browser, st. the lamabi and chaudai of the content-box of this html-element, iske content se ek dum chipak ke.
          extractBlocks(aChat.content)
          .map( (block, idx) => {
            if(idx%2) {   // i.e---is code block
              return (
                  <SyntaxHighlighter language={findLanguage(block)} style={coldarkDark} key={uuidv4()}>
                    {block}
                  </SyntaxHighlighter>
              ); 
            } else {
              return (
                <Typography key={uuidv4()} sx={{
                  wordBreak: "break-word"
                }}>
                  {block}
                </Typography>
              );
            }
          } )
        }
        </Box>
      }
    </Box>
  );
}
