"use client"
import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  ListItemPrefix,
  Textarea,
  Spinner,
  Select,
  Option
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEdgeStore } from "base/layouts/edgeStore";
import { ImageDropzone } from "../ImageDropZone";
import {DiagramInputSchema } from "base/types/dbTypes";
import { getDomain } from "base/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { ErrorIcon } from "react-hot-toast";
import { useParams } from "next/navigation";
import { DiagramType } from "@prisma/client";
 

 

export function CreateDiagramModal({workspaceId}:{workspaceId:string}) {
  
  const [open, setOpen] = useState(false);
  const [file,setFile] =  useState<File>()
  const [fileUrl,setFileUrl] = useState("")
  

  const queryClient  = useQueryClient()

  const [diagramData,setdiagramData] = useState<DiagramInputSchema>({title:"",description:"",coverImage:"",workspaceId:""} as DiagramInputSchema) 

  const handleChange  = (event:any)=>{
    const {name,value} = event.target;
    setdiagramData({...diagramData,[name]:value})
  }


  //edgestore client
  const {edgestore} = useEdgeStore();

  const handleOpen = () => setOpen((cur) => !cur);

  const {mutateAsync:diagramMutation,isPending:diagramPending,isError:diagramError,isSuccess:diagramSuccess}  = useMutation({
    mutationFn: async (data:DiagramInputSchema) => {postDiagram(data)},
    mutationKey:['diagram','workspaceDiagram']})

  const postDiagram = async(postData:DiagramInputSchema)=>{
    let response ;

    try{
      const result  =await fetch(`${getDomain()}/api/diagram`,{
        method:'POST',
        body:JSON.stringify(postData),
        headers:{
          'Content-Type':"application/json"
        }
      })
      if(result.ok){
        console.log("diagram added successfully",await result.json()) 
      }

    }
  catch(error){
    console.log("oaps some thing went wrong in postDiagram while posting the diagram",error)
    throw new Error("error occured while posting a diagram")
  }

}

  const handleSubmit =async () => {
    console.log("submit is called")
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          console.log(progress);
        },
      });
      // you can run some server action or api here
      // to add the necessary data to your database

      console.log(res);
      setFileUrl(res.url)
      const data:DiagramInputSchema =  {
          title:diagramData.title,
          coverImage:res.url,
          description:diagramData.description,
          type:diagramData.type,
          metadata:[] as unknown as JSON,
          workspaceId:workspaceId

      }
      console.log("to be submitted",data)
      console.log("submitting the workspace")

      
     
      queryClient.invalidateQueries({queryKey:['diagram']})
      toast.promise(
          diagramMutation(data),//the workspace is posted here
         {
           loading: `Creating ${data.title}...`,
           success: <b>Horray! diagram {data.title} Created</b>,
           error: <b>Sorry, Something went wrong while creating diagram</b>,
           
         }, 
         {
            style: {
              minWidth: '250px',
              zIndex: 50,
            },
            position:'bottom-right'
         }
        
       );
        
       handleOpen()

    }
  }


  return (
    <>
     <Button onClick={handleOpen} fullWidth variant="text" size="sm" className="flex flex-row gap-2 items-center justify-center">
                <ListItemPrefix>
                  <PlusIcon strokeWidth={3} className="h-6 w-6" />
                </ListItemPrefix>
                  <span>Create Diagram</span>
                  {/* <pre>
                    {
                      JSON.stringify(diagramData)
                    }
                  </pre> */}
                </Button>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card  className="mx-auto w-full max-h-[95%] text-black">
          <CardBody className="grid grid-cols-12 gap-4 justify-center items-center">
            <div className="col-span-4 flex justify-center items-center w-full ">
              <ImageDropzone
                    
                      width={300}
                      height={250}
                      value={file}
                      onChange={(file) => {
                      setFile(file);
                      }}/>
            </div>
            <div className="col-span-8 flex flex-col gap-4">
                <Typography variant="h4" color="blue-gray">
                  Create a New Diagram
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                
                >
                  Enter all the necessary informaton about the workspace.
                  
                </Typography>
                 
                <Typography className="-mb-2" variant="h6">
                  Name
                </Typography>
                <Input name="title" value={diagramData.title} onChange={handleChange} variant="standard" label="text" size="lg" crossOrigin={undefined} />
                <Typography className="-mb-2" variant="h6">
                  Description
                </Typography>
                <Textarea name="description" value={diagramData.description} onChange={handleChange} className="text-black" variant="standard" label="Standard" />
                <div className="-ml-2.5 -mt-3">
                  <Checkbox className="font-semibold" label="Remember Me" crossOrigin={undefined} />
                </div>
                <div className="">
                    <Select
                    label="Select Version"
                    value={diagramData.type}
                    onChange={(val) => setdiagramData({...diagramData,type:val as DiagramType})}
                    >
                          <Option value={DiagramType.FLOW_DIAGRAM}>Flow Diagram</Option>
                          <Option value={DiagramType.KNOWLEDGE_DIAGRAM}>Knowledge Diagram</Option>
                          <Option value={DiagramType.MIND_MAP_DIAGRAM}>Mind-map Diagram</Option>
                          <Option value={DiagramType.PRIORITY_DIAGRAM}>Priority Diagram</Option>
                          
                    </Select>
                </div>
                <Button variant="gradient" className="w-full max-w-[60%] place-self-center justify-self-center" onClick={handleSubmit} >
                    {diagramPending && <Spinner scale={20} color="brown" />}
                    {
                      !diagramPending?"creating diag ":"Create diagram"
                    }
                    {
                      diagramError && (
                        <ErrorIcon/>
                      )
                    }
                </Button>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            image saved to the url:  <a href={fileUrl} className="">{fileUrl}</a>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              {diagramPending && <Spinner scale={20} color="brown" />}
                    {
                      !diagramPending?"creating diagram":"Create Workspace"
                    }
                    {
                      diagramError && (
                        <ErrorIcon/>
                      )
                    }
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={()=>handleSubmit()}
              >
                    Sign up
                
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

