import { Breadcrumb } from 'base/app/components/BreadCrumbs'
import { WorkspaceTable } from 'base/app/components/workspace/WorkspaceTable'
import React from 'react'

const page = () => {
  return (
    <div className='overflow-y-scroll  h-fit bg-white'>
        <Breadcrumb/>
        <WorkspaceTable/>
    </div>
  )
}

export default page