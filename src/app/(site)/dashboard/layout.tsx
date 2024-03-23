import { DashboardSidebar } from 'base/app/components/SideBar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
   <div className="flex w-full justify-center">
    <div className="sidebar flex-grow max-h-screen">
      <DashboardSidebar/>
    </div>
    <div className="p-0 m-0 w-full min-h-screen  overflow-auto border-l-2 border-lime-200">
      {
        children
      }
    </div>
   </div> 
  )
}

export default layout