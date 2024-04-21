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

const style = {
  padding: 10,
  background: "#fff",
  border: "1px solid #ddd",
};

const ReminderNode = (node: NodeProps) => {
  const { data } = node;
  const context = useContext(nodeModalContext);

  const handleClick = () => {
    // node.data.label = "Node number"+node.xPos
    context?.setNode(node);
    context?.setIsOpen(true);
  };

  return (
    <>
      <div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
        <div
          aria-hidden="true"
          className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-red-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"
        ></div>
        <div className="relative">
          <div className="border border-red-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-red-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.95em"
              height="1em"
              viewBox="0 0 256 271"
            >
              <defs>
                <linearGradient
                  id="logosAngularIcon0"
                  x1="25.071%"
                  x2="96.132%"
                  y1="90.929%"
                  y2="55.184%"
                >
                  <stop offset="0%" stop-color="#e40035"></stop>
                  <stop offset="24%" stop-color="#f60a48"></stop>
                  <stop offset="35.2%" stop-color="#f20755"></stop>
                  <stop offset="49.4%" stop-color="#dc087d"></stop>
                  <stop offset="74.5%" stop-color="#9717e7"></stop>
                  <stop offset="100%" stop-color="#6c00f5"></stop>
                </linearGradient>
                <linearGradient
                  id="logosAngularIcon1"
                  x1="21.863%"
                  x2="68.367%"
                  y1="12.058%"
                  y2="68.21%"
                >
                  <stop offset="0%" stop-color="#ff31d9"></stop>
                  <stop
                    offset="100%"
                    stop-color="#ff5be1"
                    stop-opacity="0"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#logosAngularIcon0)"
                d="m256 45.179l-9.244 145.158L158.373 0zm-61.217 187.697l-66.782 38.105l-66.784-38.105L74.8 199.958h106.4zM128.001 72.249l34.994 85.076h-69.99zM9.149 190.337L0 45.179L97.627 0z"
              ></path>
              <path
                fill="url(#logosAngularIcon1)"
                d="m256 45.179l-9.244 145.158L158.373 0zm-61.217 187.697l-66.782 38.105l-66.784-38.105L74.8 199.958h106.4zM128.001 72.249l34.994 85.076h-69.99zM9.149 190.337L0 45.179L97.627 0z"
              ></path>
            </svg>
          </div>

          <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
            <p className="text-gray-700 dark:text-gray-300">
              Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit,
              sapiente.
            </p>
          </div>
          <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
            <a
              href="#"
              download="/"
              className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center"
            >
              <span>Download</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m17 13l-5 5m0 0l-5-5m5 5V6"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="group flex items-center rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 size-8 justify-center"
            >
              <span className="sr-only">Source Code</span>
              <svg
                className="size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <Handle
          style={{
            minWidth: "4%",
            minHeight: "40%",
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
        {`bg-[${data?.rgba}]`}
        <Handle
          style={{
            minWidth: "4%",
            minHeight: "40%",
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
      </div>
    </>
  );
};

export default memo(ReminderNode);
