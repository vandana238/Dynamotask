import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Space, Tabs, Checkbox, List, Modal } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './SampleIntents.scss';
import { faMagic } from "@fortawesome/free-solid-svg-icons";

const { TabPane } = Tabs;

const SampleIntents = () => {
  const [example, setExample] = useState('');
  const [examplesList, setExamplesList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [chatMessages, setChatMessages] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [sentences, setSentences] = useState([
    "I want to book one ticket from Hyderabad to Detroit",
    "I want to book one ticket from Hyderabad to Chicago",
    "I want to book one ticket from Visakhapatnam to Detroit",
    "I want to book one ticket from Visakhapatnam to Chicago"
  ]);

  const [selectedSentences, setSelectedSentences] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerateClick = () => {
    setSelectedSentences([...sentences]);
    setIsGenerated(true); // Set the state to true when sentences are generated
  };

  const handleCheckboxChange = (sentence) => {
    setSelectedSentences((prevSelected) =>
      prevSelected.includes(sentence)
        ? prevSelected.filter((item) => item !== sentence)
        : [...prevSelected, sentence]
    );
  };

  const handleSelectAll = () => {
    setSelectedSentences(sentences);
  };

  const customStyleMap = {
    smallFont: {
      fontSize: '12px',
    },
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleAddButton = () => {
    if (isMounted) {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const text = rawContentState.blocks.map(block => block.text).join('\n');
      setChatMessages([...chatMessages, text]);
      setEditorState(EditorState.createEmpty());
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleInputChange = (e) => {
    setExample(e.target.value);
  };

  const handleAddExample = () => {
    if (example.trim() !== '') {
      setExamplesList([...examplesList, example]);
      setExample('');
    }
  };

  const handleDeleteExample = (index) => {
    const updatedExamples = [...examplesList];
    updatedExamples.splice(index, 1);
    setExamplesList(updatedExamples);
  };

  const handleEditExample = (index, newValue) => {
    const updatedExamples = [...examplesList];
    updatedExamples[index] = newValue;
    setExamplesList(updatedExamples);
  };

  const handleEditSampleIntents = (index) => {
    setEditingIndex(index);
    setEditValue(examplesList[index]); // Set the initial value for editing
  };
  
  const handleUpdateSampleIntents = (index) => {
    if (editValue.trim() !== '') {
      handleEditExample(index, editValue);
      setEditingIndex(-1);
      setEditValue('');
    }
  };

  const handleDeleteEntity = (index) => {
    handleDeleteExample(index);
    if (editingIndex === index) {
      setEditingIndex(-1);
      setEditValue('');
    }
  };

  const handleMagicIconClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddButtonClick = () => {
    setIsModalVisible(false);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleChangeValue = (value) => {
    console.log(`selected ${value}`);
  };

  const countryOptions = [
    { value: 'usa', label: 'United States' },
    { value: 'can', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    // ... Add more options if needed
  ];

  return (
    <div className="ant-layout-content-1">
      <div className="ant-card-body-1">
        <div className="ant-card-body-2">
          <div className='top1'>
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="iconStyle-mr-3"
              aria-hidden="true"
              style={{ color: "#2368a0", fontSize: "1.8rem", fontWeight: "700", marginTop: "-50px" }}
            />
            <p
              style={{
                color: "#2368a0",
                fontSize: "1.8rem",
                fontWeight: "700",
                marginTop: "-58px",
                marginLeft: "10px",
              }}
            >
              Vandhana -Settings
            </p>
          </div>
          <p style={{ fontWeight: "bolder", fontSize: "1.2rem", marginTop: "-30px", marginLeft: "3px" }}>Utterances</p>
          <div className='top2'>
          <Input
            placeholder="Add Example"
            type="text"
            className="ant-input-1"
            value={example}
            onChange={handleInputChange}
            suffix={example.trim() !== '' && <FontAwesomeIcon icon={faMagic} className="magic-icon" onClick={handleMagicIconClick} />}
          />
          <Button className='ant-btn' onClick={handleAddExample}>+ Add</Button>
        </div>
        <div className='ant-list'>
        <List
  size="small"
  bordered
  dataSource={examplesList}
  renderItem={(item, index) => (
    <List.Item>
      {editingIndex === index ? (
        <Input
          value={editValue} // Bind the value to the editValue state
          autoFocus
          onPressEnter={() => handleUpdateSampleIntents(index)} // Use handleUpdateSampleIntents when Enter is pressed
          onBlur={() => handleUpdateSampleIntents(index)} // Use handleUpdateSampleIntents when focus is lost
          onChange={(e) => setEditValue(e.target.value)} // Update editValue on every change
        />
      ) : (
        <span>{item}</span>
      )}
      <div>
        {editingIndex === index ? (
          <FontAwesomeIcon
            icon={faEdit}
            style={{ color: 'green', fontSize: '15px', marginLeft: '8px', cursor: 'pointer' }}
            onClick={() => handleUpdateSampleIntents(index)} // Update when the user clicks the edit icon again
          />
        ) : (
          <FontAwesomeIcon
            icon={faEdit}
            style={{ color: '#00aae7', fontSize: '15px', marginLeft: '8px', cursor: 'pointer' }}
            onClick={() => handleEditSampleIntents(index)} // Enter edit mode
          />
        )}
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: '#ef4048', cursor: 'pointer', marginLeft: '5px', fontSize: '15px' }}
          onClick={() => handleDeleteEntity(index)}
        />
      </div>
    </List.Item>
  )}
/>
        </div>
      </div>


        <div className="ant-card-body-3">
          <p style={{ fontWeight: "bolder", fontSize: "1.2rem", }}>Response</p>
          <div className='rdw-editor-toolbar'>
            <Button className='ant-btn-2' onClick={handleAddButton}>+ Add</Button>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              customStyleMap={customStyleMap}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'link'],
                inline: {
                  options: ['bold', 'italic', 'underline', 'strikethrough'],
                },
                blockType: {
                  inDropdown: true,
                },
                list: {
                  inDropdown: true,
                },
                textAlign: {
                  inDropdown: true,
                },
                link: {
                  showOpenOptionOnHover: true,
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="ant-modal-content">
        <Modal visible={isModalVisible} onCancel={handleModalCancel} footer={null}>
          <div className="ant-modal-body">
            <Tabs
              defaultActiveKey={activeTab}
              onChange={handleTabChange}
              className="custom-tabs"
              tabBarStyle={{ color: '#2368a0', fontWeight: 'bolder' }}
              activeTabKey={activeTab}
              activeTabStyle={{ color: '#fff', background: '#2368a0', fontWeight: 'bold' }}
            >
              <TabPane tab="Smart Recommendations" key="1">
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '18px', fontWeight: 'bold' }}>Example</span>
                  <Input placeholder="Basic usage" style={{ width: '30%', marginRight: '18px',height:"30%",borderRadius:"unset" }} />
                  <span style={{ marginRight: '18px', fontWeight: 'bold' }}>Language</span>
                  <Select
                    style={{ width: "25%", marginRight: '18px',color: "#bfbfbf",borderRadius:"unset" }}
                    onChange={handleChangeValue}
                    options={countryOptions}
                  />
                  <Space>
                    <Button
                      type="primary"
                      style={{
                        marginRight:"18px",
                        backgroundColor: '#2368a0',
                        color: '#fff',
                        borderRadius: '2px',
                        fontSize: '16px',
                        height: '40px',
                        padding: '6.4px 15px',
                        marginLeft:"130px"
                      }}
                    >
                      Generate
                    </Button>
                  </Space>
                </div>
                <p style={{ color: '#666' }}>Note: Please add a phrase and select a language to generate possible utterances.</p>
              </TabPane>
              <TabPane tab="Utterance Generator" key="2">
              <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '18px', fontWeight: 'bold' }}>Example</span>
                  <Input placeholder="Basic usage" style={{ width: '30%', marginRight: '18px',height:"30%",borderRadius:"unset" }} />
                  <span style={{ marginRight: '18px', fontWeight: 'bold' }}>Language</span>
                  <Select
                    style={{ width: "25%", marginRight: '18px',color: "#bfbfbf",borderRadius:"unset" }}
                    onChange={handleChangeValue}
                    options={countryOptions}
                  />
                  <Space>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: '#2368a0',
                        color: '#fff',
                        borderRadius: '2px',
                        fontSize: '16px',
                        height: '40px',
                        padding: '6.4px 15px',
                      }}
                      onClick={handleGenerateClick}
                    >
                      Generate
                    </Button>
                  </Space>
                </div>
                {isGenerated && (
                  <div>
                    <p style={{ color: '#black', fontWeight: 'bold', marginBottom: '8px' }}>
                      Syntax: text &lt;entityname&gt; (value1:normalization1|value2:normalization2) &lt;entityname&gt; text2
                    </p>
                    <p style={{ color: '#black', fontWeight: 'bold', marginBottom: '8px' }}>
                      Example: I want to book one ticket from &lt;source/&gt; (Hyderabad:hyd|Visakhapatnam:vskp) &lt;source/&gt; to &lt;dest/&gt; (Detroit:dtx|Chicago:ch) &lt;dest/&gt;
                    </p>

                    <div style={{ marginBottom: "8px" }}>
                      <Checkbox onClick={handleSelectAll}>Select All</Checkbox>
                    </div>

                    {selectedSentences.map((sentence, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                          checked={false}
                        />
                        <span style={{ marginLeft: "8px" }}>{sentence}</span>
                      </div>
                    ))}
                  </div>
                )}
              </TabPane>
            </Tabs>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={handleModalCancel} style={{
                  width: '81.59px',
                  background: 'white',
                  color: '#6c757d',
                  borderRadius: '2px',
                  marginRight:"8px",
                }} >
                Cancel
              </Button>
              <Button
                onClick={handleAddButtonClick}
                type="primary"
                style={{
                  width: '81.59px',
                  background: '#2368a0',
                  color: '#fff',
                  borderRadius: '2px',
                }}
              >
                +Add
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SampleIntents;