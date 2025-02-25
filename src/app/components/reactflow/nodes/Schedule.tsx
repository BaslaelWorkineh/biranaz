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

const style = {
  padding: 10,
  background: '#fff',
  border: '1px solid #ddd',
};

const ScheduleNode = (node: NodeProps) => {
  const {data }  = node
  const context = useContext(nodeModalContext)
      
  const handleClick = ()=>{
    // node.data.label = "Node number"+node.xPos
    context?.setNode(node)
    context?.setIsOpen(true)

  }

  return(
  <>
  
       
    <Card onClick={handleClick} className={` flex flex-col gap-6 justify-center items-center min-w-fit min-h-fit max-h-[40rem] ${data.label>5? 'bg-[#e0c17f]':'bg-[rgb(242,243,216)]'}  text-gray-900 font-bold text-sm p-24 rounded-[15px] shadow-lg shadow-[rgba(30,30,30,1)] border-2 border-brown-600`}>
    
            
      <NodeResizeControl minHeight={250} minWidth={400}>
              <div className="rounded-full p-2 bg-stone-800 text-sm font-semibold h-2 w-2 "></div>
            </NodeResizeControl>
            <NodeToolbar isVisible={true} position={data.toolbarPosition} className={`flex ${([Position.Left,Position.Right].includes(data.toolbarPosition))?'flex-col text-[2px]':'flex-row'} gap-4 ${Math.random() >0?'bg-[#394738]':'bg-[#245f20]'} rounded-[5px] text-stone-300 text-sm px-2`}>
                <button className='p-1'><FaEdit/></button>             
                <button className='p-1'><FaCopy/></button>
              {/* <button>expand</button> */}
            </NodeToolbar>
      <CardHeader  color="blue-gray" className='min-h-fit'>
            <Typography variant="h1" color="black" className="font-bold">
              {data.label }
            </Typography>
      </CardHeader>
      <CardBody color='rgba(30,30,30,1)'>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
           {data.label }
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
        <Typography color="black">
          Enter a freshly updated and thoughtfully furnished peaceful home
          surrounded by ancient trees, stone walls, and open meadows.
        </Typography>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          <Tooltip content="$129 per night">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-brown-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-brown-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                <path
                  fillRule="evenodd"
                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                  clipRule="evenodd"
                />
                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content="Free wifi">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-brown-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-brown-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content="2 bedrooms">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-brown-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-brown-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content={`65" HDTV`}>
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-brown-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-brown-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M19.5 6h-15v9h15V6z" />
                <path
                  fillRule="evenodd"
                  d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content="Fire alert">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-brown-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-brown-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Tooltip>
          <Tooltip content="And +20 more">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-brown-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-brown-900/10 hover:!opacity-100 group-hover:opacity-70">
              +20
            </span>
          </Tooltip>
        </div>
      </CardBody>
      <CardFooter className="pt-3">
        
        <Button size="lg" fullWidth={true}>
          Reserve
        </Button>
      </CardFooter>
      <Handle style={{minWidth:'5%',minHeight:'30%',maxWidth:'12%',maxHeight:'15%',left:"-3%",borderRadius:'4px'}} className='hover:bg-brown-600 transition-all duration-500' type="target" position={Position.Left} id="left" />
          {`bg-[${data?.rgba}]`}
          <Handle style={{minWidth:'5%',minHeight:'30%',maxWidth:'12%',maxHeight:'15%',right:"-3%",borderRadius:'4px'}} type="source" position={Position.Right} className='hover:bg-brown-600 transition-all duration-500' id="right" />
    </Card>
  </> 
        

    
  

  );
};

export default memo(ScheduleNode);