import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Card, Input, Button, Breadcrumb, Row, Col, Form, Table, Select, Space } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { HomeOutlined } from "@ant-design/icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from '../BreadCrumbss/Breadcrumbs';


const { Search } = Input;
const { TextArea } = Input;


const SettingsFile = (props) => {
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
  if (myname) {

  }
  useEffect(() => {
    console.log(sendingpaths, 'hellopath')
    sendingpaths[sendingpaths.length - 1] = myname
    setSendValues(sendingpaths)
    console.log(sendingpaths, "hellopath")
  }, [])

  // State variables
  const [appId, setAppId] = useState("");
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [sharedData, setSharedData] = useState([]);
  const [userData, setUserData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [accessMode, setAccessMode] = useState("Read-Only");
  const [secondvalue, setSecondValue] = useState("");


  // Handle Edit User function
  const handleEditUser = (user) => {
    setIsEditMode(true);
    setEditingUser(user);
    setAccessMode(user.accessMode);
  };

  // Handle Icon Click Back Field function
  const handleIconClickBackField = () => {
    navigate("/apps/:id");
  };

  // Handle Form Submit function
  const handleFormSubmit = (values) => {
    setAppId(values.appId);
    setAppName(values.name);
    setAppDescription(values.description);

    // Set the username as the name entered in the "Name" field
    setUserEmail(values.name); // Assuming the username is the same as the name for this example
  };

  // Handle User Form Submit function
  const handleUserFormSubmit = (values) => {
    setSharedData([...sharedData, { name: values.name, email: values.email, accessMode }]);
  };

  // Handle Delete User function
  const handleDeleteUser = (email) => {
    const updatedSharedData = sharedData.filter((user) => user.email !== email);
    setSharedData(updatedSharedData);
  };

  // Handle Export Data function
  const handleExportData = () => {
    console.log("Exporting data...");
  };

  // Handle Save Data function
  const handleSaveData = () => {
    console.log("Saving data...");
  };

  // Define the columns for the table
  const columns = [
    {
      title: 'Username', // Show username here
      dataIndex: 'name', // Access the "name" property from the data
      key: 'name',
      render: (_, record) =>
        isEditMode && editingUser?.email === record.email ? (
          <Form.Item name="editedName" initialValue={editingUser?.name}>
            <Input placeholder="Enter name" />
          </Form.Item>
        ) : (
          <span>{record.name}</span>
        ),
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Access Mode',
      dataIndex: 'accessMode',
      key: 'accessMode',
      render: (_, record) =>
        isEditMode && editingUser?.email === record.email ? (
          <Form.Item name="editedAccessMode" initialValue={editingUser?.accessMode}>
            <Select onChange={(value) => setAccessMode(value)}>
              <Select.Option value="Read-Only">Read-Only</Select.Option>
              <Select.Option value="Read-Write">Read-Write</Select.Option>
            </Select>
          </Form.Item>
        ) : (
          <span>{record.accessMode}</span>
        ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <span className="ant-table-cell">
          <FontAwesomeIcon
            icon={faEdit}
            className="svg-inline--fa"
            style={{ color: '#00aae7', cursor: 'pointer' }}
            onClick={() => handleEditUser(record)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: '#ef4048', cursor: 'pointer', marginLeft: '5px' }}
            aria-hidden="true"
            onClick={() => handleDeleteUser(record.email)}
          />
        </span>
      ),
    },
  ];
  const provinceData = ["Read-Only", "Read-Write"];
  const Values = ["Read-Write", "Read-Write"];

  // Handle Province Change function
  const handleProvinceChange = (value) => {
    console.log(value);
  };

  // Handle Second Value Change function
  const onSecondvalueChange = (value) => {
    setSecondValue(value);
  };

  // Function to save data to local storage
  const saveDataToLocalStorage = () => {
    const dataToSave = {
      appId,
      appName,
      appDescription,
      sharedData,
    };
    console.log("Saving data to localStorage:", dataToSave);
    localStorage.setItem("settingsData", JSON.stringify(dataToSave));
  };
  
  // Function to load data from local storage
  const loadDataFromLocalStorage = () => {
    const dataFromLocalStorage = localStorage.getItem("settingsData");
    console.log("Data loaded from localStorage:", dataFromLocalStorage);
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      console.log("Parsed data:", parsedData);
      setAppId(parsedData.appId);
      setAppName(parsedData.appName);
      setAppDescription(parsedData.appDescription);
      setSharedData(parsedData.sharedData);
    }
  };
  
  // Save data to local storage when component state changes
  useEffect(() => {
    saveDataToLocalStorage();
  }, [appId, appName, appDescription, sharedData]);
  
  // Load data from local storage when the component mounts
  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);
  
  return (
    <div className="ant-layout-content">
    <Breadcrumbs  values={sendingpaths}  />

      {/* <div className="ant-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined style={{ fontSize: "19px" }} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">apps</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ textTransform: "capitalize" }}>{myname}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div> */}
      <Card
        style={{
          marginTop: '-1vh',
          left: '100px',
          height: '60vh',
          width: '90vw',
          marginLeft: '-70px',
          boxShadow: '0 8px 24px -6px var(--antd-wave-shadow-color)',
        }}
      >
        <div>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="iconStyle mr-3"
            aria-hidden="true"
            style={{ color: '#2368a0', fontSize: '1.8rem' }}
            onClick={handleIconClickBackField}
          />
          <p
            style={{
              color: " #2368a0",
              fontSize: "1.8rem",
              fontWeight: "700",
              marginTop: "-43px",
              marginLeft: "30px",
            }}
          >
            Vandhana -Settings
          </p>
        </div>
        <Row gutter={24}>
          <Col span={12}>
            <Card>
              <Form onFinish={handleFormSubmit}>
                <Form.Item style={{fontSize:"1rem",fontWeight:"700"}}
                                label="App ID" name="appId">
                  <Input placeholder="Enter app ID"  style={{marginLeft: "31px" ,width:"540px"}}/>
                </Form.Item>
                <Form.Item  style={{fontSize:"1rem",fontWeight:"700"}} label="Name" name="name">
                  <Input placeholder="Enter name" style={{marginLeft: "35px",width:"544px"}} />
                </Form.Item>
                <Form.Item style={{fontSize:"1rem",fontWeight:"700"}} label="Description" name="description">
                  <TextArea placeholder="Enter description" rows={3} />
                </Form.Item>
              </Form>
              <Button
                type="primary"
                className="btnStyle"
                onClick={handleExportData}
              >
                <FontAwesomeIcon
                  icon={faArrowAltCircleDown}
                  className="mr-2"
                  aria-hidden="true"  
                />
                <span>Export</span>
              </Button>
              <Button
                type="primary"
                className="btnStyle"
                onClick={handleSaveData}
                style={{marginLeft:"450px"}}
              >
                <span>Save</span>
              </Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Form onFinish={handleUserFormSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Form.Item style={{ flex: 1, marginRight: '8px', fontSize: '1rem', fontWeight: '700' }} label="Users" name="email">
                    <Input placeholder="Enter email ID" />
                  </Form.Item>
                  <Space wrap>
                    <Select
                      defaultValue={provinceData[0]}
                      style={{
                        width: "110px",
                        
                      }}
                      onChange={handleProvinceChange}
                      options={provinceData.map((province) => ({
                        label: province,
                        value: province,
                      }))}
                    />
                 
                  </Space>
                  <Button type="primary" htmlType="submit" style={{ marginLeft: '8px' }}>
                    Share
                  </Button>
                </div>
              </Form>
              {sharedData.length > 0 && (
                <Card style={{ marginTop: '20px' }}>
                  <Table dataSource={sharedData} columns={columns} />
                </Card>
              )}
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SettingsFile;
