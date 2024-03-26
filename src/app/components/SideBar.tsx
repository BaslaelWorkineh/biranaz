'use client'
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Button
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  CubeIcon,
  PowerIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { Team, Workspace } from "@prisma/client";
import { CreateWorkspaceModal } from "./modals/CreateWorkspaceModal";
import { getDomain } from "base/lib/utils";

type WorkspaceFetchType={
  data:Workspace[],
  status:'OK'|'FAIL'|'LOADING'
}
type TeamsFetchType={
  data:Team[],
  status:'OK'|'FAIL'|'LOADING'
}
 

export function DashboardSidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [workspaces,setWorkspaces] = useState<WorkspaceFetchType>({data:[],status:'LOADING'})
  const [teams,setTeams]=useState<TeamsFetchType>({data:[],status:'LOADING'})
 
  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };

  const fetch_workspace = async () => {
    try {
      const response = await fetch(`${getDomain()}/api/workspace`);
      if (!response.ok) {
        setWorkspaces({...workspaces,status:'FAIL'} as WorkspaceFetchType)
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // setWorkspaces(data);
      setWorkspaces({data,status:'OK'} as WorkspaceFetchType)
    } catch (error) {

      console.error("Error fetching workspaces:", error);
      fetch_workspace()
    }
  };

  const fetch_teams =async () => {
    try {
      const response = await fetch(`${getDomain()}/api/team`);
      if (!response.ok) {
        setTeams({...teams,status:'FAIL'} as TeamsFetchType)
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Assuming response contains JSON data
      // setTeams(data);
      setTeams({data,status:'OK'} as TeamsFetchType)
    } catch (error) { 
      console.error("Error fetching workspaces:", error);
      fetch_teams()
    }
  };

  
  useEffect(() => {

    fetch_workspace();
    fetch_teams();
  }, []);
  

  return (
    <Card className="h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Branaz
        </Typography>
      </div>
      <div className="p-2">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" crossOrigin={undefined} />
      </div>
      <div className="h-[100vh] overflow-y-scroll">
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />        


          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <CubeIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Workspaces
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              
              {/* <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Bible Study
              </ListItem> */}
              {
                //check if the workspaces are fetched or not
                (workspaces?.status=='OK')?(
                  
                  //check if the workspace is empty or not
                  (workspaces.data.length) ? (workspaces.data.map((workspace,index)=>(
                  <ListItem key={workspace.id}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      {
                        workspace.title
                      }
                  </ListItem>
                ))

                    ):(
                      <div className="">No Workspaces Found</div>
                    )


                ):(
                  //check if the workspace fetch is loading or not
                    (workspaces?.status=='LOADING') ? (
                      <div className="flex flex-col gap-2 max-w-full animate-pulse px-3">
                          <ListItem className="w-full flex gap-1 items-center h-6">
                            <ListItemPrefix className="h-6 w-8 rounded-md bg-blue-gray-50">
                            &nbsp;
                            &nbsp;
                            </ListItemPrefix>
                            <div className="w-full bg-blue-gray-50 rounded-md">
                              &nbsp;
                              &nbsp;
                            </div>
                          </ListItem>
                          <ListItem className="w-full flex gap-1 items-center h-6">
                            <ListItemPrefix className="h-6 w-8 rounded-md bg-blue-gray-50">
                            &nbsp;
                            &nbsp;
                            </ListItemPrefix>
                            <div className="w-full bg-blue-gray-50 rounded-md">
                              &nbsp;
                              &nbsp;
                            </div>
                          </ListItem>
                          <ListItem className="w-full flex gap-1 items-center h-6">
                            <ListItemPrefix className="h-6 w-8 rounded-md bg-blue-gray-50">
                            &nbsp;
                            &nbsp;
                            </ListItemPrefix>
                            <div className="w-full bg-blue-gray-50 rounded-md">
                              &nbsp;
                              &nbsp;
                            </div>
                          </ListItem>
                      </div>
                    ):(
                      <div className="">Something Went Wrong</div>
                    )
                )
              }

              <ListItem ripple={false}>               
                <CreateWorkspaceModal/>
              </ListItem>
              
            
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Teams
              </Typography>
            </AccordionHeader>
          </ListItem>
          
          <AccordionBody className="py-1">
            <List className="p-0">

              {
                //check if the teams are fetched or not
                (teams?.status=='OK')?(
                  
                  //check if the teams list is empty or not
                  (teams.data.length) ? (teams.data.map((team,index)=>(
                  <ListItem key={team.id}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      {
                        team.name
                      }
                  </ListItem>
                ))

                    ):(
                      <div className="">No Teams Found</div>
                    )


                ):(
                  //check if the workspace fetch is loading or not
                    (workspaces?.status=='LOADING') ? (
                      <div className="flex flex-col gap-2 max-w-full animate-pulse px-3">
                          <ListItem className="w-full flex gap-1 items-center h-6">
                            <ListItemPrefix className="h-6 w-8 rounded-md bg-blue-gray-50">
                            &nbsp;
                            &nbsp;
                            </ListItemPrefix>
                            <div className="w-full bg-blue-gray-50 rounded-md">
                              &nbsp;
                              &nbsp;
                            </div>
                          </ListItem>
                          <ListItem className="w-full flex gap-1 items-center h-6">
                            <ListItemPrefix className="h-6 w-8 rounded-md bg-blue-gray-50">
                            &nbsp;
                            &nbsp;
                            </ListItemPrefix>
                            <div className="w-full bg-blue-gray-50 rounded-md">
                              &nbsp;
                              &nbsp;
                            </div>
                          </ListItem>
                          <ListItem className="w-full flex gap-1 items-center h-6">
                            <ListItemPrefix className="h-6 w-8 rounded-md bg-blue-gray-50">
                            &nbsp;
                            &nbsp;
                            </ListItemPrefix>
                            <div className="w-full bg-blue-gray-50 rounded-md">
                              &nbsp;
                              &nbsp;
                            </div>
                          </ListItem>
                      </div>
                    ):(
                      <div className="">Something Went Wrong</div>
                    )
                )
              }

              
              <ListItem>
                <Button fullWidth variant="text" size="sm" className="flex flex-row gap-2 items-center justify-center">
                <ListItemPrefix>
                  <PlusIcon strokeWidth={3} className="h-6 w-6" />
                </ListItemPrefix>
                  <span>New Team</span>
                </Button>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
      <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Branaz PRO and get even more nodes, plugins, advanced features and so much more.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert>
      </div>
    </Card>
  );





//   <Typography
//   as="li"
//   onClick={()=>alert("this is a test .")}
//   onDragCapture={(event)=>onDragStart(event,'IdeaNode')}
//   variant="small"
//   color="red"
//   onDragStart={(event)=>onDragStart(event,'IdeaNode')} className='bg-stone-800 rounded-[8px] text-stone-200 text-lg font-semibold px-2 py-2 cursor-auto ' draggable>
// <item.icon strokeWidth={2.5}  className="h-6 w-6"  color="gray"/>
// </Typography>

}