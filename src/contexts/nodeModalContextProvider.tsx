'use client'
import { createContext, useState } from "react";
import { NodeProps } from "reactflow";


export const nodeModalContext  = createContext<{isOpen: boolean; node: NodeProps | null; setNode: React.Dispatch<React.SetStateAction<NodeProps | null>>; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>} | null>(null)

export default function NodeModalProvider({children}:{children:React.ReactNode}){
     const [node,setNode] = useState<NodeProps | null>(null)
     const [isOpen,setIsOpen] = useState(false)
     return(
         <nodeModalContext.Provider value={{isOpen:isOpen,node:node,setNode:setNode,setIsOpen:setIsOpen }}>
             {children}
         </nodeModalContext.Provider>
     )
 }