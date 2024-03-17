import { useCallback } from 'react';
import ReactFlow, { Controls, Background, useEdgesState, useNodesState, applyNodeChanges, NodeChange, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  {
    id: '11',
    position: { x: Math.random()*100+100, y: Math.random()*1000+100 },
    data:{
        title:"string"
    }
  },
  {
    id: '12',
    position: { x: Math.random()*100+100, y: Math.random()*100+100 },
    data:{
        title:"string"
    }
  },
  {
    id: '13',
    position: { x: Math.random()*20+100, y: Math.random()*30 },
    data:{
        title:"string"
    }
  },
];

function Flow() {
  const [nodes, setNodes] = useNodesState(generateRandomNodes(10)); // Generate 3 random nodes
  const [edges, setEdges] = useEdgesState([{
    id:'e131',
    source:'11',
    target:"13"
      }]);
  const onNodeDragStart = (event: any, node: any) => console.log('drag start', node);
  const onNodeDragStop = (event: any, node: any) => alert('drag stop' +JSON.stringify(node));
  const onNodeClick = (event: any, node: any) => console.log('click node', node);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((els) => applyNodeChanges(changes, els)),
    []
  );

  function generateRandomNodes(numNodes: number) {
    const newNodes = [];
    for (let i = 0; i < numNodes; i++) {
      newNodes.push({
        id: "1"+i+1, // Ensure unique IDs as strings
        position: { x: Math.random() * 1000 + 300, y: Math.random() * 1000 + 300 },
        data: { title: "string" },
      });
    }
    return newNodes;
  }

  return (
    <div className='h-screen'>
      <ReactFlow nodes={nodes} onNodesChange={onNodesChange} nodesDraggable={true} onNodeDragStop={onNodeDragStop} onClick={()=>onNodeClick}>
      <Background color={'rgba(0,0,255,1)'} variant={BackgroundVariant.Lines} lineWidth={.05}/>
        <Controls  />
      </ReactFlow>
    </div>
  );
}

export default Flow;