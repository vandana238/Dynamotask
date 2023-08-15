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
import { useLocation, useNavigate } from "react-router-dom";



const { TabPane } = Tabs;

const SampleIntents = (props) => {
   const Responsedata = [
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
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [sendvalues, setSendValues] = useState()
  const [Sampleindex, setSample] = useState([]);
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
    const storedIntents = localStorage.getItem("SampleFile");
    if (storedIntents) {
      setSample(JSON.parse(storedIntents));
    }
  }, []);

  const handleIconClickBackField = () => {
    navigate("/apps/:id");
  };
  const updateAndSaveSampleData = (data) => {
    localStorage.setItem("SampleFile", JSON.stringify(data));
    setSample(data);
  };
 
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

  const getSelectedSentences = () => {
    const selectedSentences = Responsedata.filter(item =>
      selectedCheckboxes.includes(item.text)
    );
    return selectedSentences;
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
  const handleCheckboxChange = (checkboxValue) => {
    let updatedSelectedCheckboxes = [...selectedCheckboxes];
  
    if (updatedSelectedCheckboxes.includes(checkboxValue)) {
      updatedSelectedCheckboxes = updatedSelectedCheckboxes.filter(value => value !== checkboxValue);
    } else {
      updatedSelectedCheckboxes = [...updatedSelectedCheckboxes, checkboxValue];
    }
    setSelectedCheckboxes(updatedSelectedCheckboxes);
    // Store updated selectedCheckboxes data in local storage
    localStorage.setItem("selectedCheckboxes", JSON.stringify(updatedSelectedCheckboxes));
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


  const storeExamplesListInLocalStorage = (data) => {
    localStorage.setItem("examplesList", JSON.stringify(data));
  };
  
  useEffect(() => {
    const storedIntents = localStorage.getItem("SampleFile");
    const storedExamplesList = localStorage.getItem("examplesList");
    const storedSelectedCheckboxes = localStorage.getItem("selectedCheckboxes");
  
    if (storedIntents) {
      setSample(JSON.parse(storedIntents));
    }
    if (storedExamplesList) {
      setExamplesList(JSON.parse(storedExamplesList));
    }
    if (storedSelectedCheckboxes) {
      setSelectedCheckboxes(JSON.parse(storedSelectedCheckboxes));
    }
  }, []);
  
  const handleAddExample = () => {
    if (example.trim() !== '') {
      const newExamplesList = [...examplesList, example];
      setExamplesList(newExamplesList);
      setExample('');
      storeExamplesListInLocalStorage(newExamplesList);
    }
  };
  
  const handleDeleteSelected = () => {
    const updatedExamplesList = examplesList.filter((item, index) => !selectedSentences.includes(index));
    setExamplesList(updatedExamplesList);
  
    const updatedSelectedSentences = selectedSentences.filter(index => index < examplesList.length);
    setSelectedSentences(updatedSelectedSentences);
  
    // Clear selected checkboxes
    setSelectedCheckboxes([]);
  };
  const handleDeleteExample = (index) => {
    const updatedExamples = [...examplesList];
    updatedExamples.splice(index, 1);
    setExamplesList(updatedExamples);
    storeExamplesListInLocalStorage(updatedExamples);
  };
  
  
  const handleEditExample = (index, newValue) => {
    const updatedExamples = [...examplesList];
    updatedExamples[index] = newValue;
    setExamplesList(updatedExamples);
  };

  const handleEditSampleIntents = (index) => {
    setEditingIndex(index);
    setEditValue(examplesList[index].text); // Set the initial value for editing
  };
  
  const handleUpdateSampleIntents = (index) => {
    if (editValue.trim() !== '') {
      handleEditExample(index, editValue);
      setEditingIndex(-1);
      setEditValue('');
    }

  };

  const handleDeleteEntity = (index) => {
    const updatedExamplesList = examplesList.filter((_, i) => i !== index);
    const updatedSelectedSentences = selectedSentences.filter((sentenceIndex) => sentenceIndex !== index);
  
    setExamplesList(updatedExamplesList);
    setSelectedSentences(updatedSelectedSentences);
    setEditingIndex(-1);
    setEditValue('');
  
    storeExamplesListInLocalStorage(updatedExamplesList);
    localStorage.setItem("selectedCheckboxes", JSON.stringify(updatedSelectedSentences));
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


  const handleSelectSentence = (index) => {
    const selectedSentencesCopy = [...selectedSentences];
    if (selectedSentencesCopy.includes(index)) {
      selectedSentencesCopy.splice(selectedSentencesCopy.indexOf(index), 1);
    } else {
      selectedSentencesCopy.push(index);
    }
    setSelectedSentences(selectedSentencesCopy);
  };


  return (
    <div className="ant-layout-content-1">
      <Breadcrumbs  values={sendingpaths}/>
      <div className="ant-card-body-1">
        <div className="ant-card-body-2">
          <div className='top1'>
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="iconStyle-mr-3"
              aria-hidden="true"
              style={{ color: "#2368a0", fontSize: "1.8rem", fontWeight: "700", marginTop: "-50px" }}
              onClick={handleIconClickBackField}

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
  dataSource={[...examplesList, ...getSelectedSentences()]}
  renderItem={(item, index) => (
    <List.Item>
            {editingIndex === index ? (
              <Input
                value={editValue}
                autoFocus
                onPressEnter={() => handleUpdateSampleIntents(index)}
                onBlur={() => handleUpdateSampleIntents(index)}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <span>
                <input
                  type='checkbox'
                  onChange={() => handleSelectSentence(index)}
                  checked={selectedSentences.includes(index)}
                />
                {typeof item === 'string' ? <span>{item}</span> : <span>{item.text}</span>}
              </span>
            )}
            <div>
              {editingIndex === index ? (
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{
                    color: 'green',
                    fontSize: '15px',
                    marginLeft: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleUpdateSampleIntents(index)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{
                    color: '#00aae7',
                    fontSize: '15px',
                    marginLeft: '8px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleEditSampleIntents(index)}
                />
              )}
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  color: '#ef4048',
                  cursor: 'pointer',
                  marginLeft: '5px',
                  fontSize: '15px',
                }}
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
                  <Input placeholder="Basic usage" style={{ width: '30%', marginRight: '18px', height: "30%", borderRadius: "unset" }} />
                  <span style={{ marginRight: '18px', fontWeight: 'bold' }}>Language</span>
                  <Select
                    style={{ width: "25%", marginRight: '18px', color: "#bfbfbf", borderRadius: "unset" }}
                    onChange={handleChangeValue}
                    options={countryOptions}
                  />
                  <Space>
                    <Button
                      type="primary"
                      style={{
                        marginRight: "18px",
                        backgroundColor: '#2368a0',
                        color: '#fff',
                        borderRadius: '2px',
                        fontSize: '16px',
                        height: '40px',
                        padding: '6.4px 15px',
                        marginLeft: "130px"
                      }}
                    >
                      Generate
                    </Button>
                  </Space>
                </div>
                <p style={{ color: '#666' }}>Note: Please add a phrase and select a language to generate possible utterances.</p>
              </TabPane>
              {/* {-------------------------------------------------------------------------------------------------------------------------------------------------------------?} */}

              <TabPane tab="Utterance Generator" key="2">
                <div>
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
                              checked={selectedCheckboxes.length === sentences.length}
                              onChange={handleSelectAll}
                            />
                          </span>
                          Select All
                        </label>
                        {Responsedata.map((item, index) => (
                          <div key={index} className="ant-list-item ml-0 d-flex align-items-center justify-content-between">
                            <label className="ant-checkbox-wrapper mr-4">
                              <span className="ant-checkbox">
                                <input
                                  type="checkbox"
                                  className="ant-checkbox-input"
                                  checked={selectedCheckboxes.includes(item.text)}
                                  onChange={() => handleCheckboxChange(item.text)}
                                />
                              </span>
                            </label>
                            <span>
                              <div style={{ marginLeft: "25px", marginTop: "-25px", marginBottom: "15px" }}>
                                {item.text.substring(0, item.entities[0].startPos)}
                                <Tooltip title={`Entity: ${item.entities[0].entity.Name}\nNormalization: ${item.entities[0].normalization.Name}`}>
                                  <span className="blue-text">{item.entities[0].synonms.Value}</span>
                                </Tooltip>
                                {item.text.substring(item.entities[0].endPos, item.entities[1].startPos)}
                                <Tooltip title={`Entity: ${item.entities[1].entity.Name}\nNormalization: ${item.entities[1].normalization.Name}`}>
                                  <span className="blue-text">{item.entities[1].synonms.Value}</span>
                                </Tooltip>
                                {item.text.substring(item.entities[1].endPos)}
                              </div>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabPane>
            </Tabs>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={handleModalCancel} style={{
                width: '81.59px',
                background: 'white',
                color: '#6c757d',
                borderRadius: '2px',
                marginRight: "8px",
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