import React, { useState, useEffect } from 'react';
import classes from "./NlpApps.module.scss";
import  ChatBotImage from "../../chatbot.png";
import { Layout, Avatar, Button, Modal, Card, Col, Row, Tabs, Input, Dropdown, Menu, Breadcrumb } from 'antd';
import { HomeFilled, EllipsisOutlined, DownOutlined,SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { TabPane } = Tabs;
const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;
const NlpApps = () => {
  const navigate = useNavigate();
  const [appname, setAppname] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState(localStorage.getItem('cards') !== null ? JSON.parse(localStorage.getItem('cards')) : []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [filteredCards, setFilteredCards] = useState(cards);
  const currentPath = window.location.pathname;
  var sendingpaths=currentPath.split('/')
  
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);
  const searchIconStyle = { color: '#2368a0' };
  const handleCreateCard = () => {
    const newCard = {
      id: Math.random().toString(),
      data: {
        appname: appname,
        description: description,
      },
      createdOn: new Date().toLocaleDateString(),
    };
    setCards([...cards, newCard]);
    setAppname('');
    setDescription('');
    console.log(newCard.createdOn);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleCreateCard();
    setAppname('');
    setDescription('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value) => {
    // Update the filteredCards state based on the search term
    const filteredApps = cards.filter(
      (card) =>
        card.data.appname.toLowerCase().includes(value.toLowerCase()) ||
        card.data.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCards(filteredApps);
  };
  const hello = (cards) => {
    console.log(cards.data.appname,"yyyyyyyyyyyyyyyy")
   var paths=[]
   var paths=(JSON.parse(localStorage.getItem("BreadCrumbs")))
  
   paths.push(cards.data.appname)
   console.log(paths,"tttttttttttttttt")
   localStorage.setItem("BreadCrumbs",JSON.stringify(paths))
   let id=cards.id
   console.log(id,"yyyyyyyyyyyyyyyy")
    navigate(`/apps/${id}`, {
      state: {
        cards,
      },
    });
  };

  const items = [
    { key: '1', label: 'Export' },
    { key: '2', label: 'Delete' },
  ];

  const handleMenuClick = (e) => {
    console.log('Clicked', e);
    if (e.key === '2') {
      setSelectedCard(e.domEvent.currentTarget.dataset.cardId);
      showModalDelete();
    }
  };

  const showModalDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleOkDelete = () => {
    setConfirmLoading(true);
    // Delete the selected card
    setCards((prevCards) =>
      prevCards.filter((card) => card.id !== selectedCard)
    );
    setTimeout(() => {
      setIsDeleteModalOpen(false);
      setConfirmLoading(false);
      setSelectedCard(null); // Reset the selected card
    }, 2000);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedCard(null); // Reset the selected card
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <div className={classes.NlpApps__Container}>
      <div className={classes.DescriptionWrapper}>
        <div className={classes.TextDesc}>
          <h2 className={classes.DescHeader} style={{ margin: "28px", color: "#2368a0",fontSize: "26px" }}>NLP Apps</h2>
          <p className={classes.DescText} >
            Natural Language Processing (NLP) allows machines to break down and
            interpret human language. it's at the core of tools we use every day
            - from translation software, chatbots, spam filters and search
            engines, to grmmer correction software, voice assistants, and social
            media monitoring tools. Start your NLP journey with no-code tools.
          </p>
        </div>
        <div className={classes.ChatBotImageWrapper}>
            <img className={classes.ChatBotImage} src={ChatBotImage} alt="ChatBotImage" />
        </div>
      </div>
      <div className={classes.TabsWrapper}></div>
      <div>
        <Button type="primary" onClick={showModal} style={{ backgroundColor: '#2368a0',
    color: 'white',
    margin: '22px',
    marginTop: '-50px',}}>+ Create New App</Button>
      </div>
      <div>
        <Tabs type="line" className='tabs-sty' style={{ display: 'flex', fontSize: "40px", marginLeft: "30px", marginTop: "-15px", fontweight: "1000" }}>
          <TabPane tab="My Apps" key="1">
            <h15 style={{ fontWeight: 'bold', color: 'black', fontSize: "15px", }}>NLP Apps created By You</h15>
          </TabPane>
          <TabPane tab="Shared With Me" key="2">
            <h15 style={{ fontWeight: 'bold', color: 'black', fontSize: "15px" }}>NLP Apps Shared With Me</h15>
          </TabPane>
          <TabPane tab="All Apps" key="3">
            <h15 style={{ fontWeight: 'bold', color: 'black', fontSize: "15px" }}>NLP All Apps</h15>
          </TabPane>
        </Tabs>
        <p style={{ marginLeft: "995px", width: "20vw", marginTop: "-8vh" }}>
        <Input
        placeholder="search for apps"
        enterButton="Search"
        onSearch={handleSearch}
        suffix={<SearchOutlined style={searchIconStyle} />}
      />

      
        </p>
      </div>
      <div style={{ marginTop: '4vh' }}>
      <div style={{ marginTop: '4vh' }}>
        <Row gutter={16}>
          {filteredCards.map((card) => (
            <Col span={8} key={card.id}>
              <Card style={{ height: '25vh', width: '25vw', marginLeft: '20px' }} onClick={() => hello(card)}>
                <h2 style={{ fontSize: '20px', marginTop: '1px', color: '#2a7189' }}>{card.data.appname}</h2>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: "270px", marginTop: "-45px" }}>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                      <EllipsisOutlined />
                    </a>
                  </Dropdown>
                </div>
                <p>{card.data.description}</p>
                <div>
                  <p>Created on: {card.createdOn}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      </div>
      <div className="ant-modal-content">
        <Modal
          title={<span className="ant-modal-header" style={{ color: "#2368a0", fontSize: "1.5rem", marginRight: "30px" }}>Create New App</span>}
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="create" type="primary" onClick={handleOk}>
              + Create
            </Button>
          ]}
          className="modalFont" style={{ width: '520px' }}>
          <div className="form-1">
            <form>
              <div>
                <label htmlFor="name" style={{ fontWeight: 700, fontSize: '1.09rem', fontWeight: 'bolder' }}>App Name<span style={{ color: 'red' }}>*</span></label>
                <Input id="name" placeholder="Enter App Name" onChange={(e) => { setAppname(e.target.value) }} style={{ marginTop: "1vh" }} />
              </div>
              <div className="form-group" style={{ marginTop: "2vh" }}>
                <label htmlFor="description" style={{ fontWeight: 700, fontSize: '1.09rem', fontWeight: 'bolder' }}>
                  App Description
                </label>
                <Input.TextArea rows={4} id="description" placeholder="Enter App Description" style={{ marginTop: "1vh" }} onChange={(e) => { setDescription(e.target.value) }} />
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          visible={isDeleteModalOpen}
          onCancel={handleCancelDelete}
          onOk={handleOkDelete}
          confirmLoading={confirmLoading}
        >
          <p>Are you sure you want to delete this card?</p>
        </Modal>
      </div>
    </div>
  );
};

export default NlpApps;
