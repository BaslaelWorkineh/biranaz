'use client'

import { Inter } from "next/font/google";
import "../app/globals.css";
import { ReactFlowProvider } from "reactflow";
import NodeModalProvider from "base/contexts/nodeModalContextProvider";

const inter = Inter({ subsets: ["latin"] });



export default function NodeModalContext({children}:{children:React.ReactNode}
) {
  return (

        <NodeModalProvider>
            {children}
        </NodeModalProvider>
          
  );
}
