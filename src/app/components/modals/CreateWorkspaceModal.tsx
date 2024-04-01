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
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEdgeStore } from "base/layouts/edgeStore";
import { ImageDropzone } from "../ImageDropZone";
import { WorkspaceInputSchema } from "base/types/dbTypes";
import { getDomain } from "base/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";






export function CreateWorkspaceModal() {
  
  const [open, setOpen] = useState(false);
  const [file,setFile] =  useState<File>()
  const [fileUrl,setFileUrl] = useState("")

  const queryClient  = useQueryClient()

  const [workspaceData,setWorkspaceData] = useState<WorkspaceInputSchema>({workspaceCover:"",workspaceDescription:"",workspaceName:""} as WorkspaceInputSchema) 

  const handleChange  = (event:any)=>{
    const {name,value} = event.target;

    setWorkspaceData({...workspaceData,[name]:value})
  }


  //edgestore client
  const {edgestore} = useEdgeStore();

  const handleOpen = () => setOpen((cur) => !cur);

  const postWorkspace = async(postData:WorkspaceInputSchema)=>{
    let response ;

    try{
      const result  =await fetch(`${getDomain()}/api/workspace`,{
        method:'POST',
        body:JSON.stringify(postData),
        headers:{
          'Content-Type':"application/json"
        }
      })
      if(result.ok){
        console.log("workspace added successfully",await result.json()) 
      }

    }
  catch(error){
    console.log("oaps some thing went wrong in postWorkspace while posting the workspace",error)
    throw new Error("error occured while posting a workspace")
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
      const data:WorkspaceInputSchema =  {
        workspaceCover:res.url,
        workspaceName:workspaceData.workspaceName,
        workspaceDescription:workspaceData.workspaceDescription

      }
      console.log("to be submitted",data)
      console.log("submitting the workspace")

      
     
      queryClient.invalidateQueries({queryKey:['workspaces']})
      toast.promise(
          postWorkspace(data),//the workspace is posted here
         {
           loading: `Creating ${data.workspaceName}...`,
           success: <b>Horray! Workspace {data.workspaceName} Created</b>,
           error: <b>Sorry, Something went wrong while creating workspace</b>,
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
                  <span>New Workspace</span>
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
                  Create New Workspace
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
                <Input name="workspaceName" value={workspaceData.workspaceName} onChange={handleChange} variant="standard" label="text" size="lg" crossOrigin={undefined} />
                <Typography className="-mb-2" variant="h6">
                  Description
                </Typography>
                <Textarea name="workspaceDescription" value={workspaceData.workspaceDescription} onChange={handleChange} className="text-black" variant="standard" label="Standard" />
                <div className="-ml-2.5 -mt-3">
                  <Checkbox className="font-semibold" label="Remember Me" crossOrigin={undefined} />
                </div>
                <Button variant="gradient" className="w-full max-w-[60%] place-self-center justify-self-center" onClick={handleSubmit} >
                    Create Workspace
                </Button>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            image saved to the url:  <a href={fileUrl} className="">{fileUrl}</a>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
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

