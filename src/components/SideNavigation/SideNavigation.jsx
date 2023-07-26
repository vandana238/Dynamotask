import React from "react";
import PropTypes from "prop-types";
import DynamoImage from "../../dynamo-logo.png";
import DynamoImage1 from "../../dynamo-logo1.png";
import classes from "./SideNavigation.module.scss";
import {
  AppstoreFilled,
  ContainerFilled,
  FundOutlined,
  HomeFilled,
  LineChartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { Divider } from "antd";

const NAVIGATION_DATA = [
  {
    id: "1",
    icon: <HomeFilled />,
    text: "Home",
    active: true,
    path: "/home",
  },
  {
    id: "2",
    icon: <AppstoreFilled />,
    text: "NLP Apps",
    active: true,
    path: "/nlp-apps",
  },
  {
    id: "3",
    icon: <LineChartOutlined />,
    text: "Bot Builder",
    active: true,
    path: "/bot-builder",
  },
];

const BOTTOM_NAV_DATA = [
  {
    icon: <ContainerFilled />,
    text: "Miracle's Blog",
  },
  {
    icon: <QuestionCircleOutlined />,
    text: "HELP",
  },
  {
    icon: <FundOutlined />,
    text: "Request a Demo!",
  },
];

const SideNavigation = (props) => {
  const { isSideNavOpen } = props;
  const location = useLocation();

  const getActiveState = (currentPath, activePath, strictCheck = false) => {
    if (strictCheck) {
      return currentPath === activePath;
    }

    const parentPath = activePath.split("/")[1];
    const childPath = currentPath.split("/")[1];

    if (parentPath === childPath) {
      return true;
    }
    return false;
  };
  const fun=((item)=>

  {
    console.log(item)
    let localarray=[]
    localarray.push(item.path)
    localStorage.setItem("BreadCrumbs",JSON.stringify(localarray))
    alert(item.path)
  })

  return (
    <div
      className={`${classes.SideNavigationContainer} ${
        isSideNavOpen && classes.Open
      }`}
    >
      <div className={classes.SideNavInner__Container}>
        <div className={classes.TopContainer}>
          <div className={classes.AppLogoWrapper}>
            {isSideNavOpen ? (
              <img
                src={DynamoImage}
                alt="DynamoImage"
                width="200px"
                height="50px"
              />
            ) : (
              <img
                src={DynamoImage1}
                alt="DynamoImage1"
                width="50px"
                height="50px"
              />
            )}
          </div>

          <div className={classes.NavOptions}>
            {NAVIGATION_DATA?.map((navItem, index) => (
              <NavLink
                className={`${classes.NavItem} ${
                  getActiveState(navItem?.path, location?.pathname) &&
                  classes.Active
                }`} 
                to={navItem?.path}
                onClick={(()=>{fun(navItem)})}
              >
                {navItem?.icon ? (
                  <span className={classes.Icon}>{navItem?.icon}</span>
                ) : null}
                {isSideNavOpen && navItem?.text ? (
                  <span className={classes.Text}>{navItem?.text}</span>
                ) : null}
              </NavLink>
            ))}
            {isSideNavOpen ? (
              <Divider
                className={classes.RecentDivider}
                orientation="left"
                orientationMargin="0"
              >
                MOST RECENT
              </Divider>
            ) : (
              <Divider
                className={`${classes.RecentDivider} ${classes.Close}`}
              />
            )}
            <div className={classes.NavItem}>
              <span className={classes.Icon}>SA</span>
              {isSideNavOpen ? (
                <span className={classes.Text}>Sample</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className={classes.BottomContainer}>
          <div
            className={`${classes.BottomDivider} ${
              !isSideNavOpen ? classes.Close : ""
            }`}
          >
            <Divider className={classes.RecentDivider} />
          </div>

          {BOTTOM_NAV_DATA?.map((navItem, index) => (
            <div className={classes.NavItem}>
              {navItem?.icon ? (
                <span className={classes.Icon}>{navItem?.icon}</span>
              ) : null}
              {isSideNavOpen && navItem?.text ? (
                <span className={classes.Text}>{navItem?.text}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SideNavigation.propTypes = {};

export default SideNavigation;
