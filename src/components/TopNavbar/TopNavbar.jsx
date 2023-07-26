import React from "react";
import { Dropdown, Space } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import ProfileImage from "../../assets/images/profile-image.png";
import classes from "./TopNavbar.module.scss";

const TopNavbar = (props) => {
  const items = [
    {
      label: "Reset Password",
      key: "1",
    },
    {
      label: "Forgot Password",
      key: "2",
    },
    {
      label: "logout",
      key: "3",
    },
  ];

  return (
    <div className={classes.TopNavbarContainer}>
      <div className={classes.ProfileWrapper}>
        <Dropdown menu={{ items }} trigger={["click"]}>
            <Space>
              <div className={classes.ProfileImageWrapper}>
                <img
                  src={ProfileImage}
                  className={classes.Profile__Image}
                  alt="profileLogo"
                />
              </div>
              Vandana Chelluri
              <CaretDownFilled />
            </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopNavbar;
