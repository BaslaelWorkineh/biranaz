import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  NodeProps,
  NodeTypes,
} from 'reactflow';

// initial nodes and edges
let initialNodes: Node[] = [
  {
    id: '1',
    type:'IdeaNode',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    type:'IdeaNode',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
];
let initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'buttonedge',
  },
];

const storedDiagram = typeof window !== "undefined" ? window.localStorage.getItem("Diagram"):null
 



export type RFState = {
  addNode: any;
  addEdge: any;
  nodes: Node[];
  selectedNode:Node;
  setSelectedNode:(node:Node)=>void;
  changeNodeData: (args:NodeProps) => void;
  edges: Edge[];
  getNode: (id:string)=>Node|undefined;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: storedDiagram?JSON.parse(storedDiagram as string).nodes:initialNodes,
  edges: storedDiagram?JSON.parse(storedDiagram as string).edges:initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  addNode: (node:Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  addEdge: (edge:Edge) => {
    set({
      edges: [...get().edges, edge],
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  getNode: (id:string) => {
    return get().nodes.find((node) => node.id === id);
  },
  changeNodeData: (args:NodeProps) => {
    const { id, data, selected } = args;

    
    const node = get().getNode(id);

    if (!node) return;

    const newNode = {
      ...node,
      selected,
      data: {
        ...node.data,
        ...data,
      },
    };

    const nodes = get().nodes.map((node) => {
      if (node.id === id) {
        return newNode;
      }

      return node;
    });

    set({
      nodes: nodes as Array<Node<NodeProps>>,
    });
  },
  selectedNode:initialNodes[0],
  setSelectedNode(node) {
    set({ selectedNode: node })
  },
}));

export const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  // onDrop: state.onDrop,
  addEdge: state.addEdge,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  selectedNode: state.selectedNode,
  setSelectedNode: state.setSelectedNode,
  getNode:state.getNode,
  changeNodeData:state.changeNodeData
  // defaultEdgeOptions: state.defaultEdgeOptions,
  // getNode: state.getNode,
  // changeNodeData: state.changeNodeData,
  // allowTargetConnection: state.allowTargetConnection,
  // allowSourceConnection: state.allowSourceConnection,
  // selectedNodes: state.selectedNodes,
  // setSelectedNodes: state.setSelectedNodes,
  // deselectNodes: state.deselectNodes,
});


export default useStore;
