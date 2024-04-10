import React, { FC, useCallback, useState } from 'react'
import { Handle, HandleType, NodeProps, Position, useUpdateNodeInternals } from 'reactflow'

const CustomNode:FC<NodeProps> = ({data}) => {

    
  return (
    <div className='flex flex-col gap-6 justify-center items-center min-w-[30rem] min-h-[10rem] bg-stone-900 text-stone-300 font-bold text-2xl px-14 py-10 rounded-[15px]'>
        {/* <CustomHandle className='w-[3rem] h-[3rem] bg-brown-600' type={['source','target'][0] as HandleType} position={Position.Left}></CustomHandle> */}
        <h1 className="">
            {data.title}
        </h1>
        <RandomHandleNode />
        
    </div>
  )
}

export default CustomNode

const CustomHandle = ({ position, source }:any) => (
    <Handle
      className='absolute -left-[20px]'
      type="target"
      position={position}
      isValidConnection={(connection) => connection.source === source}
      onConnect={(params) => console.log('handle onConnect', params)}
      style={{ background: 'rgba(10,255,10,1)' ,minHeight:'40px',minWidth:'40px'}}
    />
  );



  function RandomHandleNode({ id }:any) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [handleCount, setHandleCount] = useState(0);
    const randomizeHandleCount = useCallback(() => {
      setHandleCount(Math.floor(Math.random() * 14));
      updateNodeInternals(id);
    }, [id, updateNodeInternals]);
   
    return (
      <div className='flex flex-col gap-4 w-full justify-center items-center h-fit'>
        {Array.from({ length: handleCount/2 }).map((_, index) =>  (
              <Handle
              key={index}
              type="target"
              position={"left" as any}
              id={`handle-${index}`}
              className={`w-[3rem] h-[3rem] -left-[2.5rem] text-green-500 bg-brown-600`}
              style={{ top:((index+1)*10)+"%", borderRadius:'50%' ,minHeight:'1rem',minWidth:'1rem',marginTop:'2rem',marginBottom:'2rem'}}
            />
  
            )
         
          
        
         
        )}
     {Array.from({ length: handleCount/2 }).map((_, index) =>  (
              <Handle
              key={index}
              type="target"
              position={"right" as any}
              id={`handle-${index}`}
              className={`w-[3rem] h-[3rem] -right-[2.5rem]`}
              style={{ top:((index+1)*10)+"%", borderRadius:'50%' ,minHeight:'1rem',minWidth:'1rem',marginTop:'2rem',marginBottom:'2rem'}}
            />
  
            )
         
          
        
         
        )}
        <div>
          <button className='px-4 py-2 bg-stone-100 text-stone-900 rounded-[15px]' onClick={randomizeHandleCount}>Randomize handle count</button>
          <p>There are {handleCount} handles on this node.</p>
        </div>
      </div>
    );
  }

  