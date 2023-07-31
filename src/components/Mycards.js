import React, { useEffect } from "react";
import { Card, Row, Col } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from './BreadCrumbss/Breadcrumbs';

import { useState } from "react";
const Mycards = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sendvalues, setSendValues] = useState()
  console.log(location.state, "checkvalues")
  const sendprop = location.state
  const myname = location.state && location.state.cards && location.state.cards.data.appname;
  const desc = location.state && location.state.cards && location.state.cards.data.description;
  console.log(location.state, "Mycardscomponent")
  const currentPath = window.location.pathname;
  var sendingpaths = currentPath.split('/')

  useEffect(() => {
    sendingpaths[sendingpaths.length - 1] = myname
    setSendValues(sendingpaths)
  }, [])

console.log(myname,"mynamedatatatatatatat")

  const handleIconClickBack = () => {
    navigate("/");
  };

  const Follow = () => {
    var arr=JSON.parse(localStorage.getItem("BreadCrumbs"))
    arr.push("IntentsFile")
    alert(arr)
    localStorage.setItem("BreadCrumbs",JSON.stringify(arr))
    navigate('IntentsFile', {
      state: {
        sendingpaths
      },
    })
  }

  const FollowEntites = () => {
    var arr=JSON.parse(localStorage.getItem("BreadCrumbs"))
    arr.push("EntitiesFile")
    alert(arr)
    localStorage.setItem("BreadCrumbs",JSON.stringify(arr))
    navigate('EntitiesFile', {
      state: {
        sendingpaths
      },
    })
  }

  
  const FollowSettings = () => {
    var arr=JSON.parse(localStorage.getItem("BreadCrumbs"))
    arr.push("SettingsFile")
    alert(arr)
    localStorage.setItem("BreadCrumbs",JSON.stringify(arr))
    navigate('SettingsFile', {
      state: {
        sendingpaths
      },
    })
  }

  return (
    <div style={{ margin: '10px', marginTop: "-30px" }}>
      <Breadcrumbs/>
      <Card
        style={{
          marginTop: '1vh',
          left: '100px',
          height: '35vh',
          width: '88vw',
          marginLeft: '-85px',
          boxShadow: '0 8px 24px -6px var(--antd-wave-shadow-color)'
        }}
      >
        <div>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="iconStyle mr-3"
            aria-hidden="true"
            style={{ color: '#2368a0', fontSize: '1.8rem' }}
            onClick={handleIconClickBack}
          />
          <p style={{ color: " #2368a0", fontSize: "1.8rem", fontWeight: "700", marginTop: "-43px", marginLeft: "30px" }}>Hello</p>
          {/* <p>{myname} {desc}</p> */}
          
          <p style={{ fontSize: "1.1rem", marginLeft: "32px", marginTop: "-30px" }}>Hello</p>

        </div>
        <div style={{ marginTop: "50px" }}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card onClick={(e) => Follow()}>
                <div style={{ marginTop: '6vh', height: '70px' }}>
                  <div style={{ color: "#2368a0", fontSize: "1.5rem", fontWeight: "600", marginTop: "-5vh", height: "3vh" }}>Intents</div>
                  <div>
                    <p>Define your Intents here.</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card onClick={(e) => FollowEntites()}>
                <div style={{ marginTop: '6vh', height: '70px' }}>
                  <div style={{ color: "#2368a0", fontSize: "1.5rem", fontWeight: "600", marginTop: "-5vh", height: "3vh" }}>Entities</div>
                  <div>
                    <p>Define your Entities here.</p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card onClick={(e) => FollowSettings()}>
                <div style={{ marginTop: '6vh', height: '70px' }}>
                  <div style={{ color: "#2368a0", fontSize: "1.5rem", fontWeight: "600", marginTop: "-5vh", height: "3vh" }}>Settings</div>
                  <div>
                    <p>Overall App Configurations..</p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default Mycards;
