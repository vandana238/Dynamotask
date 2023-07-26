import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Card, Input, Button, Breadcrumb, List } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import "./IntentsFile.css";
import Breadcrumbs from '../BreadCrumbss/Breadcrumbs';
const { Search } = Input;

const IntentsFile = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const myname = location.state?.cards?.data?.appname ?? "";
  const desc = location.state?.cards?.data?.description ?? "";

  const [Intents, setIntents] = useState([]);
  const [entityInput, setEntityInput] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sendvalues, setSendValues] = useState()
  console.log(location.state, "checkvalues")
  const sendprop = location.state
  console.log(location.state, "Mycardscomponent")
  const currentPath = window.location.pathname;
  var sendingpaths = currentPath.split('/Intents')
  if (myname) {

  }
  useEffect(() => {
    console.log(sendingpaths, 'hellopath')
    sendingpaths[sendingpaths.length - 1] = myname
    setSendValues(sendingpaths)
    console.log(sendingpaths, "hellopath")
  }, [])

  useEffect(() => {
    const storedEntities = localStorage.getItem("Intents");
    if (storedEntities) {
      setIntents(JSON.parse(storedEntities));
    }
  }, []);

  const handleIconClickBackField = () => {
    navigate("/apps/:id");
  };

  const handleAddEntity = () => {
    if (entityInput.trim() !== "") {
      const updatedEntities = [...Intents, entityInput];
      setIntents(updatedEntities);
      setEntityInput("");
      localStorage.setItem("Intents", JSON.stringify(updatedEntities));
    }
  };

  const handleEditEntity = (index) => {
    setEditingIndex(index);
    setEditValue(Intents[index]);
  };

  const handleUpdateEntity = (index) => {
    const updatedEntities = [...Intents];
    updatedEntities[index] = editValue;
    setIntents(updatedEntities);
    setEditingIndex(-1);
    setEditValue("");
    localStorage.setItem("Intents", JSON.stringify(updatedEntities));
  };

  const handleDeleteEntity = (index) => {
    const updatedEntities = [...Intents];
    updatedEntities.splice(index, 1);
    setIntents(updatedEntities);
    localStorage.setItem("Intents", JSON.stringify(updatedEntities));
  };

  useEffect(() => {
    const filteredEntities = Intents.filter((entity) =>
      entity.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredEntities);
  }, [Intents, searchQuery]);

  return (
    <div className="ant-layout-content">
      {/* <Breadcrumbs values={sendingpaths} /> */}
      <Card
        style={{
          marginTop: "4vh",
          left: "150px",
          height: "55vh",
          width: "80vw",
          marginLeft: "-85px",
          boxShadow: "0 8px 24px -6px var(--antd-wave-shadow-color)",
        }}
      >
        <div>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="iconStyle mr-3"
            aria-hidden="true"
            style={{ color: "#2368a0", fontSize: "1.8rem" }}
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
            Vandhana - Intents
          </p>
        </div>

        <div className="addIntent" style={{ marginTop: "5vh" }}>
          <Input
            className="ant-input-1"
            placeholder="Add Intents"
            style={{ marginRight: "8px" }}
            value={entityInput}
            onChange={(e) => setEntityInput(e.target.value)}
          />
          <Button
            disabled={entityInput.trim() === ""}
            type="button"
            className="ant-btn"
            onClick={handleAddEntity}
          >
            <span>+ Add Intents</span>
          </Button>
          <div>
            <p
              className="ant-input-wrapper"
              style={{
                marginLeft: "900px",
                width: "20vw",
                marginTop: "-4vh",
              }}
            >
            <Search
                placeholder="search for Intents"
                enterButton
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
                

            </p>
          </div>
        </div>

        <div className="listHeader-heading-1">
          <p style={{ marginLeft: "10px" }}> Intents</p>
          <p style={{ marginLeft: "1100px", marginTop: "-50px" }}>Actions</p>
        </div>

        <List
          size="small"
          bordered
          dataSource={searchQuery ? searchResults : Intents}
          renderItem={(item, index) => (
            <List.Item>
              {editingIndex === index ? (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleUpdateEntity(index)}
                  autoFocus
                />
              ) : (
                <span>{item}</span>
              )}

              <div>
                {editingIndex === index ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{
                      color: "green",
                      fontSize: "20px",
                      marginLeft: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleUpdateEntity(index)}
                  />
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{
                        color: "#00aae7",
                        fontSize: "20px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEditEntity(index)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{
                        color: "#ef4048",
                        cursor: "pointer",
                        marginLeft: "5px",
                        fontSize: "20px",
                      }}
                      onClick={() => handleDeleteEntity(index)}
                    />
                  </>
                )}
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default IntentsFile;