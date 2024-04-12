'use client'

import { nodeModalContext } from 'base/contexts/nodeModalContextProvider'
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react'
import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import useStore, { selector } from 'base/contexts/store';
import { useShallow } from 'zustand/react/shallow';
import { NodeProps,Node } from 'reactflow';
 
export default function NodeDrawer() {
 
  const nodeModalValues  = useContext(nodeModalContext)
  const {changeNodeData,getNode} = useStore(useShallow(selector))
  const closeDrawer = () => nodeModalValues?.setIsOpen(false);
  const [currentNode ,setCurrentNode] = useState<Node>(getNode(nodeModalValues?.node?.id as string) as Node)
  console.log("this is the current node ",currentNode)
  useEffect(()=>{
    setCurrentNode(getNode(nodeModalValues?.node?.id as string) as Node)
  
  },[getNode, nodeModalValues?.node?.id])


  const handleChange = (event:any)=>{
    const {name,value}= event.target
      setCurrentNode({...currentNode,data:{
        ...currentNode.data,
        [name]:value

      }})
      changeNodeData({id:currentNode.id,data:currentNode.data,selected:currentNode.selected} as NodeProps)
      
  }
  
 
  return (
    <React.Fragment>
     <Drawer  size={400} overlay={false} placement='right' open={nodeModalValues?.isOpen as boolean} onClose={closeDrawer} className='w-full border-l-2 border-l-brown-100 overflow-auto'>
        <div className="flex items-center justify-between px-4 pb-2 w-[60rem] bg-brown-200">
          <Typography variant="h5" color="blue-gray">
            {nodeModalValues?.node?.data.label}
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="mb-5 px-4">
          <Typography variant="small" color="gray" className="font-normal ">
            Write the message and then click button.
            {
              JSON.stringify(currentNode)
            }
          </Typography>
        </div>
        <form className="flex flex-col gap-6 p-4 ">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input name='label' value={currentNode?.data?.label} onChange={handleChange} type="label" label="label" crossOrigin={undefined} />
          <Input label="Subject" crossOrigin={undefined} />
          <Textarea rows={6} label="Message" />
          <Button>Send Message</Button>
        </form>
      </Drawer>
    </React.Fragment>
  );
}