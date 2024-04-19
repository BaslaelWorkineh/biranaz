import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  ConnectionMode,
  Position,
  Panel,
  ReactFlowInstance,
  MiniMap,
  Node,
  XYPosition,
} from "reactflow";
import "reactflow/dist/style.css";
import BiEdge from "./edges/BiEdge";
import EdgeWithButton from "./edges/EdgeWithButton";
import {
  FaMap,
  FaNetworkWired,
  FaRedo,
  FaRegPlusSquare,
  FaSave,
  FaUndo,
  FaUserAstronaut,
} from "react-icons/fa";

import { NodeSelectorBar } from "base/app/components/reactflow/NodeSelectorBar";
import { Input, Button, ButtonGroup } from "@material-tailwind/react";
import {
  Cog8ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import useStore from "base/contexts/store";
import { useShallow } from "zustand/react/shallow";
import { selector } from "base/contexts/store";
import { useQuery } from "@tanstack/react-query";
import { cn, getDomain } from "base/lib/utils";
import { DiagramWithWorkspaceWithCreator } from "base/types/dbTypes";
import { useParams } from "next/navigation";
import { DiagramBreadCrumb } from "../DiagramBreadCrumb";
import Loader from "../Loader";
import {nodeTypes} from 'base/app/components/reactflow/nodes/index'


const edgeTypes = {
  bidirectional: BiEdge,

  Buttonedge: EdgeWithButton,
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
  //loading the diagram starts here
  const { slug }: { slug: string } = useParams();

  const {
    data: diagram,
    isLoading: diagramLoading,
    error: diagramError,
  } = useQuery({
    queryFn: () => fetch_workspace_diagram(),
    queryKey: ["diagram", "workspaceDiagram", slug],
  });

  const fetch_workspace_diagram = async () => {
    try {
      const response: Response = await fetch(
        `${getDomain()}/api/diagram?slug=${slug}`
      );

      const data = await response.json();

      console.log("the diagram are ", data);
      return data as DiagramWithWorkspaceWithCreator;
    } catch (error) {
      console.error("Error fetching diagram:", error);
      // fetch_teams()
    }
    return {} as DiagramWithWorkspaceWithCreator;
  };

  //loading the diagram ends here

  const {
    nodes,
    edges,
    addEdge,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    undo,
    redo,
    setIsrecordable,
    isRecordable,
    isUndoable,
    isRedoable,
  } = useStore(useShallow(selector));
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const [mapOpen, setMapOpen] = useState(false);

  // useEffect(() => {
  //   const initialNodes = localStorage.getItem("information")
  //     ? JSON.parse(localStorage.getItem("information") as string).nodes
  //     : generateRandomNodes(2);
  //   const initialEdges: Edge[] = localStorage.getItem("information")
  //     ? JSON.parse(localStorage.getItem("information") as string).edges
  //     : [
  //         {
  //           id: "edge-Button",
  //           source: "bi-2",
  //           target: "self-1",
  //           type: "Buttonedge",
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
        id: "Idea-" + Math.round(Math.random() * 30 + 100),
        type,
        position: position as XYPosition,
        data: {
          label: `${type} node`,
          title: "this is a test",
          toolbarPosition: Position.Bottom,
        },
      };

      addNode(newNode);
    },
    [reactFlowInstance]
  );

  const onDragStart = (event: any, nodeType: any) => {
    // setIsrecordable(false)
    event.dataTransfer.setData("reactflow-node", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragStop = (event: any, nodeType: any) => {
    alert("this is shown after the drag stops " + isRecordable);
    setIsrecordable(true);
    console.log("drag stopped");
  };

  const saveChanges = () => {
    const diagramInfo = {
      nodes,
      edges,
    };

    localStorage.setItem("Diagram", JSON.stringify(diagramInfo));
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

    addNode(newNode);
  }

  return (
    <div className="relative h-screen">
      <div className="absolute bottom-2 right-2 z-40 ">
      <Button onClick={()=>setMapOpen(!mapOpen)} className="minimap-toogle p-2 rounded-lg bg-brown-500 drop-shadow-sm hover:bg-brown-400 cursor-pointer transition-all duration-500 z-40">
        <FaMap />
      </Button>
      </div>
      <div className="header absolute  flex gap-2 justify-between items-center py-1 w-full z-50 bg-white">
        <DiagramBreadCrumb
          diagram={diagram as DiagramWithWorkspaceWithCreator}
        />
        <NodeSelectorBar />
        <ButtonGroup color="brown" size="sm" className="px-4">
          <Button
            className="bg-green-600"
            size="sm"
            onClick={() => alert("this is a test .")}
          >
            <small>save Changes</small>
          </Button>
          <Button
            color="green"
            size="sm"
            onClick={() => alert("this is a test .")}
          >
            <Cog8ToothIcon className="h-5 w-5" strokeWidth={2} />
          </Button>
        </ButtonGroup>
      </div>
      
      <Loader isVisible={diagramLoading} />
      {/* <small className="absolute right-0 top-0 px-3 py-1 rounded-bl-[10px] bg-brown-900 text-white text-xs z-50">
        verson 1.0
      </small> */}
      <ReactFlow
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        // onNodeDragStop={onDragStop}
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
        onNodeDrag={() => setIsrecordable(false)}
        onNodeDragStop={() => setIsrecordable(true)}
      >
        {/* <Panel position={"bottom-right"}>
          
        </Panel> */}

        <Background
          className="bg-[#5e301d2c]"
          color={"#3097ff"}
          variant={BackgroundVariant.Lines}
          lineWidth={0.09}
          gap={40}
        />
        <Controls position="bottom-left">
          <div className="flex flex-col gap-0 mt-5">
            <Button
              onClick={saveChanges}
              className="bg-brown-400 text-stone-200 text-sm font-semibold p-1.5 cursor-pointer w-full h-full rounded-none transition-all duration-500"
            >
              <FaSave />
            </Button>

            {
            <Button
              onClick={undo}
              disabled={!isUndoable}
              className="bg-brown-400 text-stone-200 text-sm font-semibold p-1.5 cursor-pointer w-full h-full disabled:grayscale rounded-none transition-all duration-500"
            >
              <FaUndo />
            </Button>
            }

            <Button
              onClick={redo}
              disabled={!isRedoable}
              className="bg-brown-400 text-stone-200 text-sm font-semibold p-1.5 cursor-pointer w-full h-full disabled:grayscale rounded-none transition-all duration-500"
            >
              <FaRedo />
            </Button>

            {/* <h1
              onDragStart={(event) => onDragStart(event, "IdeaNode")}
              className="bg-stone-800 rounded-[8px] text-stone-200 text-lg font-semibold px-2 py-2 cursor-auto "
              draggable
            >
              <FaNetworkWired />
            </h1> */}
            {/* <div
              className="dndnode"
              onDragStart={(event) => onDragStart(event, "default")}
              draggable={true}
            >
              <FaRegPlusSquare />
            </div> */}
          </div>
        </Controls>
        {mapOpen&&(
          <MiniMap
            className="bg-[#3b190b81]"
            maskColor="#4b291b4a"
            maskStrokeWidth={1}
            position="bottom-right"
            offsetScale={0}
            nodeStrokeColor={"green"}
            nodeBorderRadius={15}
            style={{
              border: "1px solid #3b190b81 ",
            }}
            pannable
            zoomable
          />
        )}
      </ReactFlow>
    </div>
  );
}

export default Flow;
