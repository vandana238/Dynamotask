import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Space, Tabs, Checkbox, List, Modal } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEdit, faTrash, faMagic } from '@fortawesome/free-solid-svg-icons';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './SampleIntents.scss';
import Breadcrumbs from '../BreadCrumbss/Breadcrumbs';
import { Tooltip } from 'antd';


const { TabPane } = Tabs;

const SampleIntents = () => {
  // State variables
  const [example, setExample] = useState('');
  const [examplesList, setExamplesList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [chatMessages, setChatMessages] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [selectedSentences, setSelectedSentences] = useState([]);
  const [question, setQuestion] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedChoices, setGeneratedChoices] = useState([]);
 const [sentences, setSentences] = useState([]);
  // const [sentences, setSentences] = useState([]);

const Responsedata=[
  {
      "text": "I want to book one ticket from Hyderabad to Detroit",
      "entities": [
          {
              "entity": {
                  "Id": null,
                  "Name": "source"
              },
              "normalization": {
                  "Id": null,
                  "Name": "hyd"
              },
              "synonms": {
                  "Id": null,
                  "Value": "Hyderabad"
              },
              "startPos": 31,
              "endPos": 40
          },
          {
              "entity": {
                  "Id": null,
                  "Name": "dest"
              },
              "normalization": {
                  "Id": null,
                  "Name": "dtx"
              },
              "synonms": {
                  "Id": null,
                  "Value": "Detroit"
              },
              "startPos": 44,
              "endPos": 51
          }
      ],
      "language": {
          "Id": "31A18135-21D8-4BE8-8993-372F179E144C",
          "Name": "English"
      }
  },
  {
      "text": "I want to book one ticket from Hyderabad to Chicago",
      "entities": [
          {
              "entity": {
                  "Id": null,
                  "Name": "source"
              },
              "normalization": {
                  "Id": null,
                  "Name": "hyd"
              },
              "synonms": {
                  "Id": null,
                  "Value": "Hyderabad"
              },
              "startPos": 31,
              "endPos": 40
          },
          {
              "entity": {
                  "Id": null,
                  "Name": "dest"
              },
              "normalization": {
                  "Id": null,
                  "Name": "ch"
              },
              "synonms": {
                  "Id": null,
                  "Value": "Chicago"
              },
              "startPos": 44,
              "endPos": 51
          }
      ],
      "language": {
          "Id": "31A18135-21D8-4BE8-8993-372F179E144C",
          "Name": "English"
      }
  },
  {
      "text": "I want to book one ticket from Visakhapatnam to Detroit",
      "entities": [
          {
              "entity": {
                  "Id": null,
                  "Name": "source"
              },
              "normalization": {
                  "Id": null,
                  "Name": "vskp"
              },
              "synonms": {
                  "Id": null,
                  "Value": "Visakhapatnam"
              },
              "startPos": 31,
              "endPos": 44
          },
          {
              "entity": {
                  "Id": null,
                  "Name": "dest"
              },
              "normalization": {
                  "Id": null,
                  "Name": "dtx"
              },
              "synonms": {
                  "Id": null,
                  "Value": "Detroit"
              },
              "startPos": 48,
              "endPos": 55
          }
      ],
      "language": {
          "Id": "31A18135-21D8-4BE8-8993-372F179E144C",
          "Name": "English"
      }
  },
  {
      "text": "I want to book one ticket from Visakhapatnam to Chicago",
      "entities": [
          {
              "entity": {
                  "Id": null,
                  "Name": "source"
              },
              "normalization": {
                  "Id": null,
                  "Name": "vskp"
              },
              "synonms": {
                  "Id": null,
                  "Value": "Visakhapatnam"
              },
              "startPos": 31,
              "endPos": 44
          },
          {
              "entity": {
                  "Id": null,
                  "Name": "dest"
              },
              "normalization": {
                  "Id": null,
                  "Name": "ch"
              },
              "synonms": {
                  "Id": null,
                  "Value": "Chicago"
              },
              "startPos": 48,
              "endPos": 55
          }
      ],
      "language": {
          "Id": "31A18135-21D8-4BE8-8993-372F179E144C",
          "Name": "English"
      }
  }
]


  const options = {
    source: ['Hyderabad', 'Visakhapatnam'],
    dest: ['Detroit', 'Chicago'],
  };
  const handleSelectAll = () => {
    if (selectedSentences.length === sentences.length) {
      setSelectedSentences([]); // Deselect all if all sentences are selected
    } else {
      setSelectedSentences(sentences); // Select all sentences
    }
  };
  
  // Function to generate sentences based on the entered example
  const generateChoices = () => {
    // Split the example by entities (<source/>, <dest/>)
    const entityRegex = /<source\/>|<dest\/>/g;
    const entities = example.match(entityRegex);

    if (entities && entities.length === 2) {
      // Replace entity tags with their corresponding options
      let choices = [example];
      entities.forEach((entity) => {
        const entityName = entity === "<source/>" ? "source" : "dest";
        const entityOptions = options[entityName] || [];
        const newChoices = [];
        choices.forEach((choice) => {
          entityOptions.forEach((option) => {
            newChoices.push(choice.replace(entity, option));
          });
        });
        choices = newChoices;
      });

      setSentences(choices);
      setIsGenerated(true); // Set the state to true when sentences are generated
    } else {
      setSentences([]);
      setIsGenerated(false);
    }
  };

  // Function to handle the "Generate" button click for Utterance Generator
  const handleQuestionChange = (e) => {
    const value = e.target.value;
    console.log('Question input:', value); // Debugging: Check the input value
    setQuestion(value);
  };

 

  const handleGenerateClick = () => {
    const regex = /^I want to book one ticket from\s+(.*?)\s+to\s+(.*?)$/i;
    const matches = question.match(regex);

    if (matches) {
      const source = matches[1].trim();
      const dest = matches[2].trim();

      const generatedSentences = [];
      options.source.forEach((sourceOption) => {
        options.dest.forEach((destOption) => {
          const sentence = `I want to book one ticket from ${sourceOption} to ${destOption}`;
          generatedSentences.push(sentence);
        });
      });

      setSentences(generatedSentences);
      setIsGenerated(true);
    } else {
      console.log('Invalid question format');
      setSentences([]);
      setIsGenerated(false);
    }
  };
  const handleCheckboxChange = (sentence) => {
    if (selectedSentences.includes(sentence)) {
      setSelectedSentences((prevSelected) => prevSelected.filter((item) => item !== sentence));
    } else {
      setSelectedSentences((prevSelected) => [...prevSelected, sentence]);
    }
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
    setEditValue(examplesList[index]);
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
    { value: 'pr', label: 'paris' },
    { value: 'lo', label: 'London' },
  ];

  return (
    <div className="ant-layout-content-1">
      <Breadcrumbs  />
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
              Hello -Intents
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
            onClick={() => handleUpdateSampleIntents(index)} 
          />
        ) : (
          <FontAwesomeIcon
            icon={faEdit}
            style={{ color: '#00aae7', fontSize: '15px', marginLeft: '8px', cursor: 'pointer' }}
            onClick={() => handleEditSampleIntents(index)} 
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
  <div style={{ marginBottom: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <span style={{ marginRight: '18px', fontWeight: 'bold' }}>Example</span>
      <Input
        placeholder="Basic usage"
        style={{ width: '30%', marginRight: '18px', borderRadius: 'unset' }}
        value={question}
        onChange={handleQuestionChange}
      />
      <span style={{ marginRight: '18px', fontWeight: 'bold' }}>Language</span>
      <Select
        style={{ width: '25%', marginRight: '18px', color: '#bfbfbf', borderRadius: 'unset' }}
        onChange={handleChangeValue}
        options={countryOptions}
      />
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
    </div>
    {isGenerated && (
      <div>
        <label className="ant-checkbox-wrapper ml-0 mb-2">
          <span className="ant-checkbox">
            <input
              type="checkbox"
              className="ant-checkbox-input"
              onChange={() => handleSelectAll()}
              style={{marginBottom:"20px"}}
            />
          </span>
          Select All
        </label>
        <div className="ant-list"  >
          {Responsedata.map((item, index) => (
            <div
              key={index}
              className="ant-list-item ml-0 d-flex align-items-center justify-content-between"
              
            >
              <label className="ant-checkbox-wrapper mr-4">
                <span className="ant-checkbox" >
                  <input
                    type="checkbox"
                    className="ant-checkbox-input"
                    value=""
                    checked={selectedSentences.includes(item.text)}
                    onChange={() => handleCheckboxChange(item.text)}
                    
                  />
                </span>
              </label>
              <span>
                <div style={{marginLeft: "25px", marginTop: "-25px", marginBottom: "15px"}}>
                {item.text.substring(0, item.entities[0].startPos)}
                <Tooltip title={(
                  <div>
                    <div><strong>Entity:</strong> {item.entities[0].entity.Name}</div>
                    <div><strong>Normalization:</strong> {item.entities[0].normalization.Name}</div>
                  </div>
                )}>
                  <span className="blue-text">{item.entities[0].synonms.Value}</span>
                </Tooltip>
                {item.text.substring(item.entities[0].endPos, item.entities[1].startPos)}
                <Tooltip title={(
                  <div>
                    <div><strong>Entity:</strong> {item.entities[1].entity.Name}</div>
                    <div><strong>Normalization:</strong> {item.entities[1].normalization.Name}</div>
                  </div>
                )}>
                  <span className="blue-text">{item.entities[1].synonms.Value}</span>
                </Tooltip>
                {item.text.substring(item.entities[1].endPos)}
              </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
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