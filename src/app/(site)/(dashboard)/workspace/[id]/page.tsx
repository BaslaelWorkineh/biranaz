'use client'
import { Workspace } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import AvatarStack from 'base/app/components/AvatarStack'
import { Breadcrumb } from 'base/app/components/BreadCrumbs'
import { WorkspaceTable } from 'base/app/components/workspace/WorkspaceTable'
import { getDomain } from 'base/lib/utils'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const page = () => {
  const {id}:{id:string} = useParams();
  const {data:workspace,isLoading:workspaceLoading,error:workspaceError}= useQuery({
    queryFn:()=>fetch_workspace(),
    queryKey:['workspace',id]
  })

  const fetch_workspace =async () => {
    try {
      const response = await fetch(`${getDomain()}/api/workspace?workspace=${id}`);
      if (!response.ok) {
        // setTeams({...teams,status:'FAIL'} as TeamsFetchType)
        throw new Error("Network response was not ok");
      }
      const data:Workspace = await response.json(); // Assuming response contains JSON data
      // setTeams(data);
      // setTeams({data,status:'OK'} as TeamsFetchType)
      return data
    } catch (error) { 
      console.error("Error fetching workspaces:", error);
      // fetch_teams()
    }

  };

  if(workspaceLoading){
    return <WorkspaceFallback/>
  }

  return (
    // <Suspense fallback={<WorkspaceFallback/>}>
      <div className='overflow-y-scroll  h-fit bg-white'>
          <header className=' flex justify-between items-start w-full min-h-[10rem]  p-10 bg-[#9c9c9c74]'>
            <div className="workspace-detail flex flex-row gap-4 items-center w-full">
              <div className="relative avatar w-28 h-28  rounded-[15px] border-[0.5rem] shadow-2xl shadow-black border-[#e7f0e6] overflow-hidden">
                  <Image alt="Workspace Cover" className='' src={workspace?.cover as string} layout='fill' objectFit='cover' />
              </div>
              <div className="title-creator flex flex-col gap-2 w-[85%]">
                <h1 className="text-3xl font-extrabold text-brown-900">{workspace?.title }</h1>
                <p className=" text-brown-900 text-sm font-sans">{workspace?.description}{workspace?.description}{workspace?.description}{workspace?.description}{workspace?.description}{workspace?.description}{workspace?.description}</p>
                <AvatarStack/>
              </div>
            </div>
           
          </header>
          {/* <section className="w-full min-h-screen bg-brown-100">
            <pre className='text-6xl font-semibold text-yellow-500'>
              {
                workspaceLoading &&(
                  <div className="">loadig...</div>
                )
              }
                {
              JSON.stringify(workspace)
            }</pre>
            "string"
          </section> */}
        <Breadcrumb/>        
        <WorkspaceTable/>
    </div>
    // </Suspense>
  )
}

export default page




function WorkspaceFallback(){
return (
  <div className='overflow-y-scroll  h-fit bg-white '>
  <div className=' flex justify-between items-start w-full min-h-[10rem]  p-10 bg-[#d2d2d274]'>
    <div className="workspace-detail flex flex-row gap-4 items-center w-full">
      <div className=" w-28 h-28  rounded-[15px]  shadow-2xl bg-[#8a888832] shadow-[#28282887] border-[#e7f0e6] overflow-hidden">
          
      </div>
      <div className="title-creator flex flex-col gap-4 w-[85%]">
        <div className=" text-3xl font-extrabold bg-g w-[40%] h-6 bg-[#8a888832] rounded-xl"/>

          <div className="description flex flex-col gap-2 w-full">
            <div className="animate-pulse text-3xl font-extrabold bg-g w-[90%] h-4 bg-[#8a888832] rounded-xl"/>
            <div className="animate-pulse text-3xl font-extrabold bg-g w-[90%] h-4 bg-[#8a888832] rounded-xl"/>
            <div className="animate-pulse text-3xl font-extrabold bg-g w-[40%] h-4 bg-[#8a888832] rounded-xl"/>

          </div>

        
        {/* <AvatarStack/> */}
      </div>
    </div>
   
  </div>
 
</div>
)
}