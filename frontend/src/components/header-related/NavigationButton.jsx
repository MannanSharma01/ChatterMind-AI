import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function NavigationButton({children, to=null, bgColor, textColor, extra, onClickFn=null}) {
  return (
    <Link to={to} className="header-navigation-btn" style={{...extra, backgroundColor: bgColor}} onClick={onClickFn}>      {/**backgroundColor isko isliye diya hai Typography ke siva, kyuki---padding ishe di hai*/}
      <Typography sx={{display: "inline-block", color: textColor, fontWeight: "500"}}>
        {children}
      </Typography>
    </Link>
  )
}