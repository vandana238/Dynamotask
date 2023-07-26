import React, { useEffect, useState } from "react";
import classes from "./Layout.module.scss";
import TopNavbar from "../TopNavbar/TopNavbar";
import SideNavigation from "../SideNavigation/SideNavigation";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const handleSideNavOpen = () => {
    setIsSideNavOpen(true);
  };
  const handleSideNavClose = () => {
    setIsSideNavOpen(false);
  };
  return (
    <div className={classes.LayoutContainer}>
      <div
        onMouseEnter={handleSideNavOpen}
        onMouseLeave={handleSideNavClose}
      >
        <SideNavigation isSideNavOpen={isSideNavOpen} />
      </div>
      <div
        className={`${classes.Layout__Body} ${
          isSideNavOpen && classes.FullWidth
        }`}
      >
        <div className={classes.Navbar__wrapper}>
          <TopNavbar />
        </div>
        <div className={classes.Page__Wrapper}>{children}</div>
        <div className={classes.Footer__Wrapper}>
         <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
