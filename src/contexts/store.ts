import { create } from "zustand";
import { TemporalState, temporal } from "zundo";
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
} from "reactflow";

// initial nodes and edges
let initialNodes: Node[] = [
  {
    id: "1",
    type: "IdeaNode",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    type: "IdeaNode",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
];
let initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "buttonedge",
  },
];

const storedDiagram =
  typeof window !== "undefined" ? window.localStorage.getItem("Diagram") : null;

type HistoryState = {
  past: { nodes: Node[]; edges: Edge[] }[];
  future: { nodes: Node[]; edges: Edge[] }[];
};

export type RFState = {
  // Existing state properties
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  getNode: (id: string) => Node | undefined;
  changeNodeData: (args: NodeProps) => void;
  currentNode: Node;
  setCurrentNode: (node: Node) => void;
  // New history state
  history: HistoryState;
  // Actions for undo and redo
  undo: () => void;
  redo: () => void;
  recordChange: () => void;
  isRecordable: boolean;
  isUndoable: boolean;
  isRedoable: boolean;
  setIsRecordable: (value: boolean) => void;
  setIsUndoable: (value: boolean) => void;
  setIsRedoable: (value: boolean) => void;
};

// this is our useRFStore hook that we can use in our components to get parts of the store and call actions
const useRFStore = create<RFState>((set, get) => ({
  nodes: storedDiagram
    ? JSON.parse(storedDiagram as string).nodes
    : initialNodes,
  edges: storedDiagram
    ? JSON.parse(storedDiagram as string).edges
    : initialEdges,
  isRecordable: true,
  isRedoable: false,
  isUndoable: false,
  // history:{
  //   nodes: storedDiagram?JSON.parse(storedDiagram as string).nodes:initialNodes,
  //   edges: storedDiagram?JSON.parse(storedDiagram as string).edges:initialEdges,
  // },

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });

    get().recordChange();
    console.log("this is the history ==== ", get().isRecordable, get().history);
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });

    get().recordChange();
    console.log("this is the history ==== ", get().history);
  },
  addNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  addEdge: (edge: Edge) => {
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
  getNode: (id: string) => {
    return get().nodes.find((node) => node.id === id);
  },
  changeNodeData: (args: NodeProps) => {
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
  currentNode: initialNodes[0],
  setCurrentNode(node) {
    set({ currentNode: node });
  },
  // Initialize history state
  history: {
    past: [],
    future: [],
  },
  // Action to record changes to nodes and edges
  recordChange: () => {
    const { nodes, edges, isRecordable } = get();

    if (isRecordable) {
      set((state) => ({
        history: {
          past: [...state.history.past, { nodes, edges }],
          future: [],
        },
      }));
      if (get().history.past.length > 0) {
        get().setIsUndoable(true);
      }
    }
  },
  // Action for undo
  undo: () => {
    const { past, future } = get().history;
    if (past.length === 0) {
      return;
    }
    //if the past is not empty , then we can undo

    const previous = past[past.length - 1];
    set({
      nodes: previous.nodes,
      edges: previous.edges,
      history: {
        past: past.slice(0, past.length - 1),
        future: [get().history.past[past.length - 1], ...future],
      },
    });
    if (get().history.past.length === 0) {
      get().setIsUndoable(false);
    }
    if (get().history.future.length > 0) {
      get().setIsRedoable(true);
    }
  },
  // Action for redo
  redo: () => {
    const { past, future } = get().history;
    if (future.length === 0) {
      return;
    }
    //if the future is not empty , then we can redo

    const next = future[0];
    set({
      nodes: next.nodes,
      edges: next.edges,
      history: {
        past: [...past, get().history.future[0]],
        future: future.slice(1),
      },
    });
    if (get().history.future.length === 0) {
      get().setIsRedoable(false);
    }
    if (get().history.past.length > 0) {
      get().setIsUndoable(true);
    }
  },
  setIsRecordable: (value: boolean) => {
    set({
      isRecordable: value,
    });
  },

  setIsUndoable: (value: boolean) => {
    set({
      isUndoable: value,
    });
  },
  setIsRedoable: (value: boolean) => {
    set({
      isRedoable: value,
    });
  },
}));

export const RFSelector = (state: RFState) => ({
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
  currentNode: state.currentNode,
  setCurrentNode: state.setCurrentNode,
  getNode: state.getNode,
  changeNodeData: state.changeNodeData,
  recordChange: state.recordChange,
  undo: state.undo,
  redo: state.redo,
  isRecordable: state.isRecordable,
  isUndoable: state.isUndoable,
  isRedoable: state.isRedoable,

  setIsrecordable: state.setIsRecordable,
  setIsUndoable: state.setIsUndoable,
  setIsReduable: state.setIsRedoable,

  history: state.history,
  // defaultEdgeOptions: state.defaultEdgeOptions,
  // getNode: state.getNode,
  // changeNodeData: state.changeNodeData,
  // allowTargetConnection: state.allowTargetConnection,
  // allowSourceConnection: state.allowSourceConnection,
  // currentNodes: state.currentNodes,
  // setCurrentNodes: state.setCurrentNodes,
  // deselectNodes: state.deselectNodes,
});

// this is our useRFStore hook that we can use in our components to get parts of the store and call actions
// export const useRFStoreWithUndo = create(
//   temporal<RFState>((set, get) => ({
//     nodes: storedDiagram?JSON.parse(storedDiagram as string).nodes:initialNodes,
//     edges: storedDiagram?JSON.parse(storedDiagram as string).edges:initialEdges,
//     isRecordable:true,
//     onNodesChange: (changes: NodeChange[]) => {
//       set({
//         nodes: applyNodeChanges(changes, get().nodes),
//       });
//         get().recordChange()
//     },
//     onEdgesChange: (changes: EdgeChange[]) => {
//       set({
//         edges: applyEdgeChanges(changes, get().edges),
//       });

//       get().recordChange()
//       console.log("this is the history ==== ",get().history)
//     },
//     addNode: (node:Node) => {
//       set({
//         nodes: [...get().nodes, node],
//       });
//     },
//     addEdge: (edge:Edge) => {
//       set({
//         edges: [...get().edges, edge],
//       });
//     },
//     onConnect: (connection: Connection) => {
//       set({
//         edges: addEdge(connection, get().edges),
//       });
//     },
//     setNodes: (nodes: Node[]) => {
//       set({ nodes });
//     },
//     setEdges: (edges: Edge[]) => {
//       set({ edges });
//     },
//     getNode: (id:string) => {
//       return get().nodes.find((node) => node.id === id);
//     },
//     changeNodeData: (args:NodeProps) => {
//       const { id, data, selected } = args;

//       const node = get().getNode(id);

//       if (!node) return;

//       const newNode = {
//         ...node,
//         selected,
//         data: {
//           ...node.data,
//           ...data,
//         },
//       };

//       const nodes = get().nodes.map((node) => {
//         if (node.id === id) {
//           return newNode;
//         }

//         return node;
//       });

//       set({
//         nodes: nodes as Array<Node<NodeProps>>,
//       });
//     },
//     currentNode:initialNodes[0],
//     setCurrentNode(node) {
//       set({ currentNode: node })
//     },

//     // Initialize history state
//   history: {
//     past: [],
//     future: [],
//   },
//   // Action to record changes to nodes and edges
//   recordChange: () => {
//     const { nodes, edges,isRecordable } = get();
//     if(isRecordable){
//       set((state) => ({
//         history: {
//           past: [...state.history.past, { nodes, edges }],
//           future: [],
//         },
//       }));
//     }
//   },
//   // Action for undo
//   undo: () => {
//     const { past, future } = get().history;
//     if (past.length === 0) return;
//     const previous = past[past.length - 1];
//     set({
//       nodes: previous.nodes,
//       edges: previous.edges,
//       history: {
//         past: past.slice(0, past.length - 1),
//         future: [get().history.past[past.length - 1], ...future],
//       },
//     });
//   },
//   // Action for redo
//   redo: () => {
//     const { past, future } = get().history;
//     if (future.length === 0) return;
//     const next = future[0];
//     set({
//       nodes: next.nodes,
//       edges: next.edges,
//       history: {
//         past: [...past, get().history.future[0]],
//         future: future.slice(1),
//       },
//     });
//   },
//   setIsRecordable:(value:boolean)=>{
//     set({
//       isRecordable:value
//     })
//   }
//   })),
// );

// const useTemporalStore = <T extends unknown>(
//   selector: (state: TemporalState<RFState>) => T,
//   equality?: (a: T, b: T) => boolean
// ) => useRFStore(useRFStoreWithUndo.temporal,selector,equality);

export type NodeModalState = {
  isModalOpen: boolean;
  setIsModalOpen: (value:boolean) => void;
};


const useNodeModalStore = create<NodeModalState>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (value) => {
    set((state) => ({
      isModalOpen: value,
    }));
  },
}));

export const NodeModalSelector = (state: NodeModalState) => ({
  isModalOpen: state.isModalOpen,
  setIsModalOpen: state.setIsModalOpen,
});




export {useNodeModalStore,useRFStore}
