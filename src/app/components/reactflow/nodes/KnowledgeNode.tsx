import React, { memo, useContext, useEffect } from 'react';
import { Handle, NodeProps, NodeResizeControl, NodeToolbar, Position } from 'reactflow';

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
import { FaCopy, FaEdit } from 'react-icons/fa';
import { NodeDrawer } from '../nodeDrawer';
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import { nodeModalContext } from 'base/contexts/nodeModalContextProvider';
import { KnowledgeType } from 'base/types/node';

/**
 * TODO: This Is a Knowledge node which includes the following
 * this will have literally any kind of data a user wants to hold . 
 * probabily a markdown file
 * 
 */

const style = {
  padding: 10,
  background: '#fff',
  border: '1px solid #ddd',
};

const KnowledgeNode = (node: KnowledgeType) => {
  const {data }  = node
  const context = useContext(nodeModalContext)
      
  const handleClick = ()=>{
    // node.data.label = "Node number"+node.xPos
    context?.setNode(node)
    context?.setIsOpen(true)

  }

  return (
    <div onDoubleClick={handleClick} className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800" style={{ cursor: 'auto' }}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">Jan 15, 2022</span>
        <a className="px-1.5 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">JavaScript</a>
      </div>
      <div className="mt-2">
        <a href="https://stackdiary.com/" className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">How to sanitize an JS</a>
        <p className="mt-2 text-gray-600 dark:text-gray-1.500">Dui urna vehicula tincidunt pretium consequat luctus mi, platea fermentum conubia tempus ac orci. Pellentesque dictum malesuada cubilia faucibus dignissim mi nascetur senectus, augue ad libero efficitur dolor duis lobortis, non etiam sociosqu.</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Read more ⟶</a>
        <div className="flex items-center">
          <img src="https://stackdiary.com/140x100.png" alt="Author Photo" className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" />
          <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">John Doe</a>
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
  );
};

export default memo(KnowledgeNode);