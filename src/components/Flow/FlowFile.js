import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import "./FlowFile.scss";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space } from 'antd';

const initialNodeType = [
  { id: '1', position: { x: 500, y: 200 }, data: { label: 'NODE1' } },
  { id: '2', position: { x: 500, y: 350 }, data: { label: 'NODE2' } },
];
const initialEdge = [{ id: 'e1-2', source: '1', target: '2', label: 'Addlabel' }];
let id = 2;
const getId = () => `${++id}`;

function FlowFile() {
  const [addnode, setAddnode] = useState(false);
  const [addChildeNode, setAddChildeNode] = useState(false);
  const [parentNode, setParentNode] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodeType);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdge);
  const [margin, setMargin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tempdata, setTempdata] = useState(null);

  const onConnect = useCallback(() => setEdges((eds) => addEdge(eds)), [setEdges]);
  let nodeRef = useRef();
  const dropdownRef = useRef();

  const handleEdgeClick = (e, data) => {
    if (data.label === 'Addlabel') {
      setTempdata(data);
      setShowDropdown(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  const handleDropdownMenuClick = (e) => {
    message.info(`Clicked on menu item: ${e.key}`);
    
    // Get the selected option's key
    const selectedKey = e.key;

    // Determine the label based on the selected key
    let newNodeLabel = '';
    if (selectedKey === '1') {
      newNodeLabel = 'Herocard';
    } else if (selectedKey === '2') {
      newNodeLabel = 'Thumbnailcard';
    } else if (selectedKey === '3') {
      newNodeLabel = 'Adaptiveoutputcard';
    } else if (selectedKey === '4') {
      newNodeLabel = 'Contactcard';
    }

    // Call the function to create a new node with the determined label
    createNewNode(newNodeLabel);

    setShowDropdown(false); // Close the dropdown after clicking an option
  };

  const createNewNode = (label) => {
    const newNodeId = getId();
    const newNode = {
      id: newNodeId,
      position: { x: 0, y: 0 }, // Set the desired position
      data: { label: label }, // Use the determined label here
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    if (tempdata) {
      setEdges((prevEdges) => [
        ...prevEdges,
        {
          id: `e-${tempdata.source}-${newNodeId}`,
          source: tempdata.source,
          target: newNodeId,
          label: 'New Edge',
        },
      ]);
    }
  };

  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
    handleEdgeClick();
  };
  const items = [
    {
      label: 'herocard',
      key: '1',
      icon: <UserOutlined />,

    },
    {
      label: 'thumbnailcard',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: 'adaptiveoutputcard',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: 'contactcard',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div style={{ width: '100%', height: '100vh' }} className='reactflow-1'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={handleEdgeClick}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
     <div className='ant-dropdown'>
     {showDropdown && (
        <Dropdown
          overlay={
            <Menu onClick={handleDropdownMenuClick}>
              {menuProps.items.map(item => (
                <Menu.Item key={item.key}>
                  {item.icon}
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          }
          trigger={['click']}
          visible={showDropdown}
          onVisibleChange={setShowDropdown}
        >
          <Button>Addlabel</Button>
        </Dropdown>
      )}

     </div>
    </div>
  );
}

export default FlowFile;
