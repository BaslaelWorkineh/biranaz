import { DashboardSidebar } from 'base/app/components/SideBar'
import NodeModal from 'base/app/components/modals/NodeModal'
import NodeModalContext from 'base/layouts/nodeModalProvider'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {

  return (
    <NodeModalContext>
    <NodeModal/>
      <div className="p-0 m-0 w-full max-w-full h-screen overflow-y-scroll overflow-x-auto border-l-2 border-brown-200 bg-white">
      {
        children
      }
   </div> 
    </NodeModalContext>
  )
}

export default layout