import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Card, Input, Button, Breadcrumb, List } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import "./EntitiesFile.css";
import Breadcrumbs from '../BreadCrumbss/Breadcrumbs';

const { Search } = Input;

const EntitiesFile = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sendvalues, setSendValues] = useState()
  const [Entites, setEntites] = useState([]);
  const [entityInput, setEntityInput] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const sendprop = location.state
  const myname = location.state && location.state.cards && location.state.cards.data.appname;
  const desc = location.state && location.state.cards && location.state.cards.data.description;
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



  useEffect(() => {
    const storedIntents = localStorage.getItem("EntitesFile");
    if (storedIntents) {
      setEntites(JSON.parse(storedIntents));
    }
  }, []);

  const handleIconClickBackField = () => {
    navigate("/apps/:id");
  };

  const handleAddEntity = () => {
    if (entityInput.trim() !== "") {
      const updatedEntities = [...Entites, entityInput];
      setEntites(updatedEntities);
      setEntityInput("");
      localStorage.setItem("Entites", JSON.stringify(updatedEntities));
    }
  };

  const handleEditEntity = (index) => {
    setEditingIndex(index);
    setEditValue(Entites[index]);
  };

  const handleUpdateEntity = (index) => {
    const updatedEntities = [...Entites];
    updatedEntities[index] = editValue;
    setEntites(updatedEntities);
    setEditingIndex(-1);
    setEditValue("");
    localStorage.setItem("Entites", JSON.stringify(updatedEntities));
  };

  const handleDeleteEntity = (index) => {
    const updatedEntities = [...Entites];
    updatedEntities.splice(index, 1);
    setEntites(updatedEntities);
    localStorage.setItem("Entites", JSON.stringify(updatedEntities));
  };

  useEffect(() => {
    const filteredEntities = Entites.filter((entity) =>
      entity.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredEntities);
  }, [Entites, searchQuery]);

  return (
    <div className="ant-layout-content">
    <Breadcrumbs values={sendingpaths} />

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
            Hello - Entities
          </p>
        </div>

        <div className="addIntent" style={{ marginTop: "5vh" }}>
          <Input
            className="ant-input-1"
            placeholder="Add Entites"
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
            <span>+ Add Entites</span>
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
                placeholder="search for Entities"
                enterButton
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
                

            </p>
          </div>
        </div>

        <div className="listHeader-heading-1">
          <p style={{ marginLeft: "10px" }}> Entities</p>
          <p style={{ marginLeft: "1100px", marginTop: "-50px" }}>Actions</p>
        </div>

        <List
          size="small"
          bordered
          dataSource={searchQuery ? searchResults : Entites}
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

export default EntitiesFile;