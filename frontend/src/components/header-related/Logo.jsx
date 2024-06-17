import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/home" style={{marginRight: "23px"}}>
      <img src="/openai.png" className="header-logo"/>
    </Link>
  );
}