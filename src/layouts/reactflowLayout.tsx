'use client'

import { Inter } from "next/font/google";
import "../app/globals.css";
import { ReactFlowProvider } from "reactflow";

const inter = Inter({ subsets: ["latin"] });



export default function FlowLayout({children}:{children:React.ReactNode}
) {
  return (

        <ReactFlowProvider>
            {children}
        </ReactFlowProvider>
          
  );
}
