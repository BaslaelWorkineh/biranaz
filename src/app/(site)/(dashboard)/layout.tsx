import { DashboardSidebar } from 'base/app/components/SideBar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
   <div className="fixed flex w-full justify-center bg-transparent">
    <div className="sidebar flex-grow max-h-screen bg-transparent">
      <DashboardSidebar/>
    </div>
    <div className="p-0 m-0 w-full max-w-full h-screen overflow-y-scroll overflow-x-auto border-l-2 border-brown-200 bg-white">
      {
        children
      }
    </div>
   </div> 
  )
}

export default layout