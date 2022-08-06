import React from "react";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <div className="footer">
      <div>Have Good Time.</div>
      <div> Follow Me:</div>
      <div>
        <InstagramIcon />
        <LinkedInIcon />
      </div>
    </div>
  );
}

export default Footer;
