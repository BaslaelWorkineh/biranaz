import { useCallback } from 'react';
import ReactFlow, { Controls, Background, useEdgesState, useNodesState, applyNodeChanges, NodeChange, BackgroundVariant, addEdge, Edge, Connection, MarkerType, ConnectionMode } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './nodes/customNode';
import IdeaNode from './nodes/IdeaNode';
import BiEdge from './edges/BiEdge';
import EdgeWithButton from './edges/EdgeWithButton';

const nodeTypes ={
  'CustomNode':CustomNode,
  'IdeaNode':IdeaNode
}

const edgeTypes = {
  bidirectional: BiEdge,

  buttonedge: EdgeWithButton,
};


const nodes = [
  {
    id: '11',
    position: { x: Math.random()*100+100, y: Math.random()*1000+100 },
    data:{
        title:"string"
    },
    type:'IdeaNode'

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
  const initialNodes  = (localStorage.getItem("information"))?JSON.parse(localStorage.getItem("information") as string).nodes:generateRandomNodes(10)
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const initialEdges: Edge[] = (localStorage.getItem("information"))?(JSON.parse(localStorage.getItem("information") as string)).edges:[
    {
      id: 'edge-button',
      source: 'bi-2',
      target: 'self-1',
      type: 'buttonedge',
    },
    {
      id: 'edge-bi-1',
      source: 'bi-1',
      target: 'bi-2',
      type: 'bidirectional',
      sourceHandle: 'right',
      targetHandle: 'left',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'edge-bi-2',
      source: 'bi-2',
      target: 'bi-1',
      type: 'bidirectional',
      sourceHandle: 'left',
      targetHandle: 'right',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'edge-self',
      source: 'self-1',
      target: 'bi-1',
      type: 'bidirectional',
      markerEnd: { type: MarkerType.Arrow },
    },
  ];
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);
  const saveChanges = ()=>{
    const information ={
      nodes,edges
    }

    localStorage.setItem("information",JSON.stringify(information)) 
    alert("saved sucecssfully")
  }

 
  

  function generateRandomNodes(numNodes: number) {
    const newNodes = [];

    for (let i = 0; i < numNodes; i++) {
      let color  = `rgba(${Math.floor(Math.random()*100)+150},${Math.floor(Math.random()*100)+150},${Math.floor(Math.random()*100)+150},1)`
      newNodes.push({
        id: "bi"+(i), // Ensure unique IDs as strings
        position: { x: Math.random() * 1000 + 300, y: Math.random() * 1000 + 300 },
        data: { title: "string "+ (i+1),label: i,rgba:color},
        type:'IdeaNode'
      });
    }
    return newNodes;
  }

  return (
    <div className='h-screen'>
      <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      snapToGrid={true}
      edgeTypes={edgeTypes}
      
      nodeTypes={nodeTypes}
      fitView
      attributionPosition="top-right"
      connectionMode={ConnectionMode.Loose}
      connectionLineStyle={{strokeWidth:'10px',stroke:'green'}}
    >
      <Background color={'rgba(0,0,255,1)'} variant={BackgroundVariant.Lines} lineWidth={.05}/>
        <Controls>
        <button onClick={saveChanges} className='bg-stone-800 rounded-[15px] text-stone-200 text-lg font-semibold px-2 py-2 cursor-pointer z-50 hover:bg-amber-700'>Save Changes</button>
        </Controls>
      </ReactFlow>
    </div>
  );
}

export default Flow;