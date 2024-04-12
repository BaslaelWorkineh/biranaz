'use client'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { Button, Typography } from '@material-tailwind/react'
import { Diagram, Workspace } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import AvatarStack from 'base/app/components/AvatarStack'
import { Breadcrumb, BreadcrumbFallback } from 'base/app/components/BreadCrumbs'
import { ImageCard, ImageCardFallback } from 'base/app/components/ImageCard'
import { CreateDiagramModal } from 'base/app/components/modals/createDiagramModal'
import { WorkspaceTable } from 'base/app/components/workspace/WorkspaceTable'
import { getDomain } from 'base/lib/utils'
import { DiagramWithWorkspace } from 'base/types/dbTypes'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const Page = () => {
  const {slug}:{slug:string} = useParams();
  const {data:workspace,isLoading:workspaceLoading,error:workspaceError}= useQuery({
    queryFn:()=>fetch_workspace(),
    queryKey:['workspace',slug]
  })

  const {data:diagrams,isLoading:diagramsLoading,error:diagramsError}  = useQuery({
    queryFn:()=>fetch_workspace_diagrams(),
    queryKey:['diagrams','workspaceDiagrams',slug]
  })

  const fetch_workspace_diagrams =async () => {
    try {
      const response:Response = await fetch(`${getDomain()}/api/diagram?workspaceSlug=${slug}`);
      
      const data = await response.json();

      console.log("the diagrams are ",data)
      return data as DiagramWithWorkspace[]

    } catch (error) { 
      console.error("Error fetching diagrams:", error);
      // fetch_teams()
    }
    return [] as DiagramWithWorkspace[]
  };

  const fetch_workspace =async () => {
    try {
      const response = await fetch(`${getDomain()}/api/workspace?slug=${slug}`);
      
      const [data] = await response.json();
      return data as Workspace;
    } catch (error) { 
      console.error("Error fetching workspaces:", error);
      // fetch_teams()
    }
    return {} as Workspace
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
                <p className=" text-brown-900 text-sm font-sans">{workspace?.description}</p>
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


        <section className="recent-activities px-6 py-6">
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Recent Activities
                  </Typography>
                  <Typography color="blue" className="mt-1 font-normal">
                    See your recent actions
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button variant="outlined" size="sm">
                    view all
                  </Button>
                  {/* <Button className="flex items-center gap-3" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                  </Button> */}
                </div>
            </div>

            <div className="activity-list grid grid-cols-3 gap-3 justify-evenly w-full">
             {
              diagrams && diagrams?.map((diagram:DiagramWithWorkspace,index)=>(
                <ImageCard diagram={diagram} key={index}/>
              ))
            } 
            
            <pre>
              diagrams
              {
                diagrams?.length
              }
            </pre>
            </div>

        </section>
        <section className="diagrams px-6 py-6">
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Knowledge Diagrams
                  </Typography>
                  <Typography color="blue" className="mt-1 font-normal">
                    Explore through your previous knowledge visualizations
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button variant="outlined" size="sm">
                    view all
                  </Button>
                  <CreateDiagramModal workspaceId={workspace?.id as string} />
                </div>
            </div>
              
            <div className="activity-list grid grid-cols-3 gap-3 justify-evenly w-full">
            {
              [1,2,3,4,5].map((num,index)=>(
                <ImageCard key={index}/>
              ))
            }
            </div>

        </section>


            
        <WorkspaceTable/>
    </div>
    // </Suspense>
  )
}

export default Page




function WorkspaceFallback(){
return (
  <div className='overflow-y-scroll  h-fit bg-white  '>
  <div className=' flex justify-between items-start w-full min-h-[10rem]  p-10 bg-[#d2d2d274]'>
    <div className="workspace-detail flex flex-row gap-4 items-center w-full">
      <div className=" w-28 h-28  rounded-[15px]  shadow-2xl bg-[#8a888832] shadow-[#28282887] border-[#e7f0e6] overflow-hidden">
          
      </div>
      <div className="title-creator flex flex-col gap-4 w-[85%]">
        <div className="animate-pulse text-3xl font-extrabold bg-g w-[40%] h-6 bg-[#8a88883c] rounded-xl"/>

          <div className="description flex flex-col gap-2 w-full">
            <div className="animate-pulse text-3xl font-extrabold bg-g w-[90%] h-4 bg-[#8a888832] rounded-xl"/>
            <div className="animate-pulse text-3xl font-extrabold bg-g w-[90%] h-4 bg-[#8a888832] rounded-xl"/>
            <div className="animate-pulse text-3xl font-extrabold bg-g w-[40%] h-4 bg-[#8a888832] rounded-xl"/>

          </div>

        
        {/* <AvatarStack/> */}
      </div>
    </div>
   
  </div>
  <BreadcrumbFallback/>        
  
  <section className='py-6'>
     {/* header with title and action buttons*/}
            {/* header started here  */}
            <div className="mb-8 flex items-center justify-between gap-8 px-6 ">
            <div className='flex flex-col gap-2 w-full'>
              <p className="w-[20%] h-4 bg-[#c5c5c5] rounded-[10px] animate-pulse" />
              <p className="w-[45%] h-3 bg-[#c5c5c5] rounded-[10px] animate-pulse" />                    
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button className='w-12 h-5 bg-[#c5c5c5] rounded-[10px] animate-pulse'/>
              <button className='w-12 h-5 bg-[#c5c5c5] rounded-[10px] animate-pulse'/>

              
            </div>
          </div>
        {/* header ends here  */}
        <div className="activity-list grid grid-cols-3 gap-3 justify-evenly w-full px-6 py-2">
            {
              [1,2,3,4,5].map((num,index)=>(
                <ImageCardFallback key={index}/>
              ))
            }
        </div>
  </section>
 
</div>
)
}