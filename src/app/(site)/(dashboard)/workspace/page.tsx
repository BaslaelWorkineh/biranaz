import { Breadcrumb } from 'base/app/components/BreadCrumbs'
import { TextCard } from 'base/app/components/TextCard'
import { WorkspaceTable } from 'base/app/components/workspace/WorkspaceTable'
import React from 'react'

const page = () => {
  return (
    <div className='py-10'>
      <Breadcrumb />


      <fieldset className='relative recent-teamspaces border-t-2 border-[#53290f6c] py-8 '>
        <legend className="ml-4 px-4 text-2xl font-body ">Recent Workspaces</legend>
        <div className="flex relative flex-nowrap  px-4 gap-6 w-full max-w-screen-lg overflow-auto hide-scroll-bar justify-self-center">
        {
            [0,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9].map((workspace,index)=>(
                <TextCard key={index} className="min-w-[25rem] border border-[#53290f6c]"/>
            ))
        }
       
        </div>
        <div className="fade absolute left-0 top-0 w-[4rem] h-full bg-gradient-to-r from-[#53290f31] to-transparent"/>
        <div className="fade absolute right-0 top-0 w-[4rem] h-full bg-gradient-to-l from-[#53290f31] to-transparent"/>

      </fieldset>
      

      <fieldset className='relative recent-teamspaces border-t-2 border-[#53290f6c] py-8 '>
        <legend className="ml-4 px-4 text-2xl font-body ">Recent team Workspaces</legend>
        <div className="flex relative flex-nowrap  px-4 gap-6 w-full max-w-screen-lg overflow-auto hide-scroll-bar justify-self-center">
        {
            [0,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9].map((workspace,index)=>(
                <TextCard key={index} className="min-w-[25rem] border border-[rgba(109,150,48,0.26)]"/>
            ))
        }
       
        </div>
        <div className="fade absolute left-0 top-0 w-[4rem] h-full bg-gradient-to-r from-[rgba(202,224,183,0.42)] to-transparent"/>
        <div className="fade absolute right-0 top-0 w-[4rem] h-full bg-gradient-to-l from-[rgba(202,224,183,0.42)] to-transparent"/>

      </fieldset>
      
      <fieldset className='my-workspaces border-t-2 border-[#53290f6c] px-4 py-8 '>
        <legend className="px-4 text-2xl font-body ">My Workspaces</legend>
        <WorkspaceTable/>
      </fieldset>
      
    
    </div>
  )
}

export default page
