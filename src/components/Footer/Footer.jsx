import React from "react";
import  MiracleLogo from "../../miracle-logo.svg";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={classes.AppFooter}>
        <div className={classes.FooterComment}>Built with ❤️ by Miracle's Innovation Labs</div>
        <div>
            <img src={MiracleLogo} alt="MiracleLogo" width='100px' height='50px' />
        </div>
    </div>
  );
};

export default Footer;
