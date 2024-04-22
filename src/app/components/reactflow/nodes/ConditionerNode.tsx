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
import { NodeDrawer } from "../nodeDrawer";
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import { nodeModalContext } from "base/contexts/nodeModalContextProvider";
import { ConditinalNodeData } from "base/types/node";

const style = {
  padding: 10,
  background: "#fff",
  border: "1px solid #ddd",
};

/**
 *TODO: Conditioner Node will consist of the following
- multiple inputs which value as booleans.
- Logical connectors like OR,NOT,AND    WITH (JUST THINKING ABT IT).
- Events to be triggereed when the conditions are met.
- Output handle with a boolean value.
- Labels, Notes and more.

  //TODO: we have to check whether every input to the node can be evaluated as a boolean or not.
 */
const ConditionerNode = (node: NodeProps) => {
  const { data }: { data: ConditinalNodeData } = node;
  const context = useContext(nodeModalContext);

  const handleClick = () => {
    // node.data.label = "Node number"+node.xPos
    context?.setNode(node);
    context?.setIsOpen(true);
  };

  return (
    <>
      <Card
        onDoubleClick={handleClick}
        className="relative rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 max-w-[40rem]"
      >
        <div className="flex flex-wrap items-start sm:gap-8">
          <div
            className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
            aria-hidden="true"
          >
            <div className="flex items-center gap-1">
              <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
            </div>
          </div>

          <div>
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {data.value}
            </Typography>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              <a href="#" className="hover:underline">
                {" "}
                Some Interesting Podcast Title{" "}
              </a>
            </h3>

            <p className="mt-1 text-sm text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
              nulla amet voluptatum sit rerum, atque, quo culpa ut
              necessitatibus eius suscipit eum accusamus, aperiam voluptas
              exercitationem facere aliquid fuga. Sint.
            </p>

            <div className="mt-4 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-1 text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>

                <p className="text-xs font-medium">48:32 minutes</p>
              </div>

              <span className="hidden sm:block" aria-hidden="true">
                &middot;
              </span>

              <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                Featuring{" "}
                <a href="#" className="underline hover:text-gray-700">
                  Barry
                </a>
                ,
                <a href="#" className="underline hover:text-gray-700">
                  Sandra
                </a>{" "}
                and
                <a href="#" className="underline hover:text-gray-700">
                  August
                </a>
                <input type="text" name="value" id="value" />
              </p>
            </div>
          </div>
        </div>
        <Handle
          style={{
            minWidth: "3%",
            minHeight: "30%",
            maxWidth: "12%",
            maxHeight: "15%",
            left: "-1.5%",
            borderRadius: "15px",
            backgroundColor: "#968b6e",
          }}
          className="hover:bg-brown-600 bg-[#968b6e] transition-all duration-500"
          type="target"
          position={Position.Left}
          id="left"
        />

        <Handle
          style={{
            minWidth: "3%",
            minHeight: "30%",
            maxWidth: "12%",
            maxHeight: "15%",
            right: "-1.5%",
            borderRadius: "15px",
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

export default memo(ConditionerNode);
