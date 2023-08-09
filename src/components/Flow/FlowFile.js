import React, { useEffect, useState, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodes,
  useEdges,
  addEdge,
} from 'reactflow';

import { Popover, Select } from 'antd';
import ResizeObserver from 'resize-observer-polyfill';

const initialNodeType = [
  { id: '1', position: { x: 500, y: 200 }, data: { label: 'NODE1' } },
  { id: '2', position: { x: 500, y: 350 }, data: { label: 'NODE2' } },
];
const initialEdge = [{ id: 'e1-2', source: '1', target: '2', label: '+' }];

let id = 2;
const getId = () => `${++id}`;

const options = [
  { value: 'herocard', label: 'herocard' },
  { value: 'thumbnailcard', label: 'thumbnailcard' },
  { value: 'adaptiveoutputcard', label: 'adaptiveoutputcard' }, 
  { value: 'contactcard', label: 'contactcard' },
  { value: 'videocard', label: 'videocard' },
  { value: 'imagecard', label: 'imagecard' }
];

function FlowFile() {
  const [Addnode, setAddnode] = useState(false);
  const [AddChildeNode, setAddChildeNode] = useState(false);
  const [parentNode, setParentNode] = useState(null);
  const [tempdata, settempdata] = useState("");
  const [nodes, setNodes] = useNodes(initialNodeType);
  const [edges, setEdges] = useEdges(initialEdge);
  const [margin, setMargin] = useState(false);
  

  let nodeRef = useRef();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      // Handle resize observer logic here
    });

    const flowContainer = document.querySelector('.react-flow');
    if (flowContainer) {
      observer.observe(flowContainer);
    }

    return () => {
      if (flowContainer) {
        observer.unobserve(flowContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (Addnode) {
      const findFirstNode = nodes.find(item => item.id === initialEdge.target);
      console.log("tempdata", tempdata)
      console.log("nodes", nodes)
      console.log("edges", edges)
      setEdges((eds) => eds.concat({
        id: String(parseInt(Math.random(100000000) * 1000000)),
        source: tempdata.source,
        target: nodes[nodes.length - 1].id,
        label: '+',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#CCCCCC', color: '#fff', fillOpacity: 0.7 },
      }));
      setEdges((eds) => eds.concat({
        id: String(parseInt(Math.random(100000000) * 1000000)),
        source: nodes[nodes.length - 1].id,
        target: tempdata.target,
        label: '+',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#CCCCCC', color: '#fff', fillOpacity: 0.7 },
      }));
      var index = edges.findIndex(x => x.id === tempdata.id);
      edges.splice(index, 1)
      setAddnode(false);
      setParentNode(null);
    }
    if (AddChildeNode) {
      setEdges((eds) => eds.concat({
        id: String(parseInt(Math.random(100000000) * 1000000)),
        source: parentNode.id,
        target: nodes[nodes.length - 1].id,
        label: '+',                                                                                    
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#CCCCCC', color: '#fff', fillOpacity: 0.7 },
      }));
      setAddChildeNode(false);
      setParentNode(null);
    }
  }, [nodes, edges, Addnode, AddChildeNode]);

  const handleEdgeClick = (e, data) => {
    settempdata(data);
    const findSourceNode = nodes.find((item) => item.id === data.source);
    setNodes((prevNodes) =>
      prevNodes.concat({
        id: getId(),
        position: { x: findSourceNode.position.x, y: findSourceNode.position.y + 70 },
        data: { label: `Node ${id}`, parentId: data.target, ...initialNodeType.data },
      })
    );
    setParentNode(findSourceNode);
    setAddnode(true);
  };

  const handleNodeClick = (e, data) => {
    setMargin(data);
    setAddChildeNode(true);
    setParentNode(data);
  };

  const handlePlusMouseEnter = () => {
    // Handle mouse enter logic
  };

  const handlePlusMouseLeave = () => {
    // Handle mouse leave logic
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        elements={[...nodes, ...edges]}
        onElementsRemove={() => {}}
        onConnect={handleEdgeClick}
        onLoad={() => {}}
        onDrop={() => {}}
        onDragOver={() => {}}
        onEdgeContextMenu={() => {}}
        onElementClick={(event, element) => {
          if (element.type === 'input' || element.type === 'output') {
            settempdata(element);
            setAddnode(true);
          } else if (element.type === 'default') {
            setMargin(element);
            setAddChildeNode(true);
            setParentNode(element);
          }
        }}
        onNodeDragStop={(event, node) => {
          setNodes((prevNodes) =>
            prevNodes.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
          );
        }}
      >
        <MiniMap />
        <Controls />
        <Background variant="cross" />
      </ReactFlow>
      <div className="vl"></div>
      {Addnode && (
        <Popover
          content={
            <Select
              defaultValue={options[0].value}
              style={{ width: 120 }}
              onChange={(value) => {
                console.log(`selected ${value}`);
              }}
              options={options}
            />
          }
          trigger="hover"
        >
          <span
            style={{ cursor: 'pointer' }}
            onMouseEnter={handlePlusMouseEnter}
            onMouseLeave={handlePlusMouseLeave}
          >
            +
          </span>
        </Popover>
      )}
    </div>
  );
}

export default FlowFile;