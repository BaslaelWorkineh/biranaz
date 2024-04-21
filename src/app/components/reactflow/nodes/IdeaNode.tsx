import React, { memo, useContext, useEffect } from "react";
import {
  Handle,
  NodeProps,
  NodeResizeControl,
  NodeToolbar,
  Position,
} from "reactflow";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

import { CgEditUnmask } from "react-icons/cg";
import { FaCopy, FaEdit } from "react-icons/fa";
import Image from "next/image";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import { nodeModalContext } from "base/contexts/nodeModalContextProvider";
import { ConditinalNodeType } from "base/types/node";

const style = {
  padding: 10,
  background: "#fff",
  border: "1px solid #ddd",
};

const BiDirectionalNode = (node: ConditinalNodeType) => {
  const { data } = node;
  const context = useContext(nodeModalContext);

  const handleClick = () => {
    // node.data.label = "Node number"+node.xPos
    context?.setNode(node);
    context?.setIsOpen(true);
  };

  return (
    <>
      <Card
        onClick={handleClick}
        className={` flex flex-col gap-6 justify-center items-center min-w-[10rem] min-h-fit  ${
          data.label > 5 ? "bg-[#e0c17f]" : "bg-[rgb(242,243,216)]"
        }  text-gray-900 font-bold text-sm rounded-[15px] shadow-lg shadow-[#1e1e1e41]`}
      >
        <NodeResizeControl minHeight={250} minWidth={400}>
          <div className="rounded-full p-2 bg-stone-800 text-sm font-semibold h-2 w-2 "></div>
        </NodeResizeControl>
        <NodeToolbar
          isVisible={true}
          position={data.toolbarPosition}
          className={`flex ${
            [Position.Left, Position.Right].includes(data.toolbarPosition)
              ? "flex-col text-[2px]"
              : "flex-row"
          } gap-4 ${
            Math.random() > 0 ? "bg-[#394738]" : "bg-[#245f20]"
          } rounded-[5px] text-stone-300 text-sm px-2`}
        >
          <button className="p-1">
            <FaEdit />
          </button>
          <button className="p-1">
            <FaCopy />
          </button>
          {/* <button>expand</button> */}
        </NodeToolbar>
        <img
          className="w-full h-full"
          alt="example_Images"
          src="https://plus.unsplash.com/premium_photo-1667238801854-8114e0b76783?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGlsbHVzdHJhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
        />
        <CardHeader color="blue-gray" className="min-h-fit">
          <Typography variant="h1" color="black" className="font-bold">
            {data.label}
          </Typography>
        </CardHeader>
        <CardBody color="rgba(30,30,30,1)">
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {data.label}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-5 w-5 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              5.0
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-3">
          <Button size="lg" fullWidth={true}>
            Reserve
          </Button>
        </CardFooter>
        <Handle
          style={{
            minWidth: "5%",
            minHeight: "30%",
            maxWidth: "12%",
            maxHeight: "15%",
            left: "-3%",
            borderRadius: "40%",
            backgroundColor: "#968b6e",
          }}
          className="hover:bg-brown-600 bg-[#968b6e] transition-all duration-500"
          type="target"
          position={Position.Left}
          id="left"
        />
        {`bg-[${data?.rgba}]`}
        <Handle
          style={{
            minWidth: "5%",
            minHeight: "30%",
            maxWidth: "12%",
            maxHeight: "15%",
            right: "-3%",
            borderRadius: "40%",
            backgroundColor: "#968b6e",
          }}
          type="source"
          position={Position.Right}
          className="hover:bg-brown-600 bg-green-500 transition-all duration-500"
          id="right"
        />
      </Card>
    </>
  );
};

export default memo(BiDirectionalNode);
