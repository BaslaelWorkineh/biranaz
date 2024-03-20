import React, { memo } from 'react';
import { Handle, NodeProps, NodeResizeControl, NodeToolbar, Position } from 'reactflow';

import { CgEditUnmask } from "react-icons/cg";
import { FaCopy, FaEdit } from 'react-icons/fa';
const style = {
  padding: 10,
  background: '#fff',
  border: '1px solid #ddd',
};

const BiDirectionalNode = ({ data }: NodeProps) => {
  return (
    
       
        <div className={`relative flex flex-col gap-6 justify-center items-center min-w-[15rem] min-h-[5rem] h-full ${data.label>5? 'bg-[#1d2a1c]':'bg-[#4b2434]'} text-stone-300 font-bold text-lg px-14 py-10 rounded-[15px]`}>
            
            <NodeResizeControl minHeight={250} minWidth={400}>
              <div className="w-full rounded-full p-2 bg-stone-800 text-sm font-semibold"></div>
            </NodeResizeControl>
            <NodeToolbar isVisible={true} position={data.toolbarPosition} className={`flex ${([Position.Left,Position.Right].includes(data.toolbarPosition))?'flex-col text-3xl':'flex-row'} gap-4 ${data.label>5?'bg-[#4b2434]':'bg-[#1d2a1c]'} rounded-[5px] text-stone-300 text-sm px-2`}>
              <button className='p-1'><FaEdit/></button>             
              <button className='p-1'><FaCopy/></button>
            {/* <button>expand</button> */}
            </NodeToolbar>   
            
            {/* <CustomHandle className='w-[3rem] h-[3rem] bg-green-600' type={['source','target'][0] as HandleType} position={Position.Left}></CustomHandle> */}
            <div className="customization-tools absolute top-0 right-4 px-4 py-2 flex gap-2 ">
              <button onClick={()=>alert("this edit button is cliced")} className="edit w-full bg-green-500 text-stone-950 px-2  rounded-[15px] hover:bg-yellow-500 transition-all duration-500">edit</button>
            </div>
            <h1 className="">
                {data.title}
            </h1>
            <input type="text" name="test" id="test" className="w-full px-6 py-3 rounded-[15px] bg-[rgba(107,107,125,0.5)]" />
          <Handle style={{minWidth:'1.5rem',minHeight:'1.5rem',left:"-3%"}} type="target" position={Position.Left} id="left" />
          {`bg-[${data?.rgba}]`}
          <Handle style={{minWidth:'1.5rem',minHeight:'1.5rem',right:"-3%"}} type="source" position={Position.Right} id="right" />
        </div>
    
  

  );
};

export default memo(BiDirectionalNode);
