import { DragEvent, useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  useEdgesState,
  useNodesState,
  applyNodeChanges,
  NodeChange,
  BackgroundVariant,
  addEdge,
  Edge,
  Connection,
  MarkerType,
  ConnectionMode,
  Position,
  Panel,
  ReactFlowInstance,
  MiniMap,
  Node,
  XYPosition,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./nodes/customNode";
import IdeaNode from "./nodes/IdeaNode";
import BiEdge from "./edges/BiEdge";
import EdgeWithButton from "./edges/EdgeWithButton";
import { FaNetworkWired, FaRegPlusSquare, FaSave } from "react-icons/fa";
import { NodeDrawer } from "./nodeDrawer";
import { Breadcrumb } from "../BreadCrumbs";
import { NodeSelectorBar } from "base/app/components/reactflow/NodeSelectorBar";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useStore from 'base/contexts/store'
import { useShallow } from 'zustand/react/shallow';
import {RFState, selector} from 'base/contexts/store'
import { randomUUID } from "crypto";

const nodeTypes = {
  CustomNode: CustomNode,
  IdeaNode: IdeaNode,
};

const edgeTypes = {
  bidirectional: BiEdge,

  buttonedge: EdgeWithButton,
};

// const nodes = [
//   {
//     id: "11",
//     position: { x: Math.random() * 100 + 100, y: Math.random() * 1000 + 100 },
//     data: {
//       title: "string",
//     },
//     type: "IdeaNode",
//   },
//   {
//     id: "12",
//     position: { x: Math.random() * 100 + 100, y: Math.random() * 100 + 100 },
//     data: {
//       title: "string",
//     },
//   },
//   {
//     id: "13",
//     position: { x: Math.random() * 20 + 100, y: Math.random() * 30 },
//     data: {
//       title: "string",
//     },
//   },
// ];

function Flow() {
  
  const { nodes, edges, addEdge,addNode,onNodesChange, onEdgesChange, onConnect } = useStore(useShallow(selector));
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  // useEffect(() => {
  //   const initialNodes = localStorage.getItem("information")
  //     ? JSON.parse(localStorage.getItem("information") as string).nodes
  //     : generateRandomNodes(2);
  //   const initialEdges: Edge[] = localStorage.getItem("information")
  //     ? JSON.parse(localStorage.getItem("information") as string).edges
  //     : [
  //         {
  //           id: "edge-button",
  //           source: "bi-2",
  //           target: "self-1",
  //           type: "buttonedge",
  //         },
  //         {
  //           id: "edge-bi-1",
  //           source: "bi-1",
  //           target: "bi-2",
  //           type: "bidirectional",
  //           sourceHandle: "right",
  //           targetHandle: "left",
  //           markerEnd: { type: MarkerType.ArrowClosed },
  //         },
  //         {
  //           id: "edge-bi-2",
  //           source: "bi-2",
  //           target: "bi-1",
  //           type: "bidirectional",
  //           sourceHandle: "left",
  //           targetHandle: "right",
  //           markerEnd: { type: MarkerType.ArrowClosed },
  //         },
  //         {
  //           id: "edge-self",
  //           source: "self-1",
  //           target: "bi-1",
  //           type: "bidirectional",
  //           markerEnd: { type: MarkerType.Arrow },
  //         },
  //       ];

  //   setNodes(initialNodes);
  //   setEdges(initialEdges);
  // }, []);

  // const onConnect = useCallback(
  //   (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
  //   []
  // );
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("reactflow-node");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node = {
        id: "Idea-" + Math.round(Math.random()*30+100),
        type,
        position: position as XYPosition,
        data: {
          label: `${type} node`,
          title: "this is a test",
          toolbarPosition: Position.Bottom,
        },
      };

      addNode(newNode)
    },
    [reactFlowInstance]
  );

  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("reactflow-node", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const saveChanges = () => {
    const information = {
      nodes,
      edges,
    };

    localStorage.setItem("information", JSON.stringify(information));
    alert("saved sucecssfully");
  };

  function generateRandomNodes(numNodes: number) {
    const newNodes = [];

    for (let i = 0; i < numNodes; i++) {
      let color = `rgba(${Math.floor(Math.random() * 100) + 150},${
        Math.floor(Math.random() * 100) + 150
      },${Math.floor(Math.random() * 100) + 150},1)`;
      newNodes.push({
        id: "bi" + i, // Ensure unique IDs as strings
        position: {
          x: Math.random() * 1000 + 300,
          y: Math.random() * 1000 + 300,
        },
        data: {
          title: "string " + (i + 1),
          label: i,
          rgba: color,
          toolbarPosition: Position.Bottom,
        },
        type: "IdeaNode",
      });
    }
    return newNodes;
  }

  function handleAddNode() {
    const i = nodes.length - 1;
    const newNode = {
      id: "bi" + i, // Ensure unique IDs as strings
      position: {
        x: Math.random() * 1000 + 300,
        y: Math.random() * 1000 + 300,
      },
      data: {
        title: "string " + (i + 1),
        label: i,
        rgba: "rgba(20,40,150,1)",
        toolbarPosition: Position.Bottom,
      },
      type: "IdeaNode",
    };

    addNode(newNode)
  }

  return (
    <div className="relative h-screen">
      <small className="absolute right-0 top-0 px-3 py-1 rounded-bl-[10px] bg-brown-900 text-white text-xs z-50">
        verson 1.0
      </small>
      <ReactFlow
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
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
        connectionLineStyle={{ strokeWidth: "15px", stroke: "black" }}
        minZoom={0.05}
        maxZoom={100}
      >
        {/* <Panel position={"bottom-right"}>
          
        </Panel> */}
        
        <Panel position="top-left" className="w-full">
          {/* <NodeSelectorBar/> */}
          <div className="header flex gap-2 justify-between px-10 py-1 w-full z-50">
            <Breadcrumb />
            <NodeSelectorBar/>
            <div className="">
              <Input
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                label="Search"
                crossOrigin={undefined}
              />
            </div>
          </div>
          
        </Panel>
        <Background
          className="bg-[#5e301d2c]"
          color={"#3097ff"}
          variant={BackgroundVariant.Lines}
          lineWidth={0.09}
          
          gap={40}
        />
        <Controls position="bottom-left">
          <div className="flex flex-col gap-3">
            <button
              onClick={saveChanges}
              className="bg-stone-800 rounded-[8px] text-stone-200 text-lg font-semibold px-2 py-2 cursor-pointer"
            >
              <FaSave />
            </button>
            <h1
              onDragStart={(event) => onDragStart(event, "IdeaNode")}
              className="bg-stone-800 rounded-[8px] text-stone-200 text-lg font-semibold px-2 py-2 cursor-auto "
              draggable
            >
              <FaNetworkWired />
            </h1>
            <div
              className="dndnode"
              onDragStart={(event) => onDragStart(event, "default")}
              draggable={true}
            >
              <FaRegPlusSquare/>
            </div>
          </div>
        </Controls>
        <MiniMap className="bg-[#3b190b81]" maskColor="#4b291b4a" maskStrokeWidth={1} position="bottom-right" offsetScale={0} nodeStrokeColor={"green"} nodeBorderRadius={15}
         style={{
            border: "1px solid #3b190b81 "
          }} pannable zoomable />
      </ReactFlow>
    </div>
  );
}

export default Flow;
