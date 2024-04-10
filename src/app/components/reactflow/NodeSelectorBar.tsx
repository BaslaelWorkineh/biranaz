"use client"
import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
  Tooltip,
} from "@material-tailwind/react";
import {
   MagnifyingGlassIcon,
   DocumentIcon,
   BellIcon,
   BoltIcon,
   CalendarDaysIcon,
   BookOpenIcon,
   VariableIcon
   } from "@heroicons/react/24/outline";
import { NodeType } from "@prisma/client";

  export const NodeSelectorItems = [
    {
      label:"Document",
      name: "Document Node",
      type: NodeType.DOCUMENT,
      icon:DocumentIcon,
      description: "This node serves as a hub for various document-related functionalities. It facilitates handling of diverse file types including images, PDFs, text files, and markdown documents, enabling seamless document management within the system."
    },
    {
      label:"Document",
      name: "Schedule Node",
      type: NodeType.SCHEDULE,
      icon:CalendarDaysIcon,
      description: "The Schedule Node empowers users to organize their tasks and events efficiently. It provides tools for creating, managing, and tracking schedules, ensuring users stay on top of their commitments and deadlines effortlessly."
    },
    {
      label:"Reminder",
      name: "Reminder Node",
      type: NodeType.REMINDER,
      icon:BellIcon,
      description: "The Reminder Node acts as a virtual assistant, helping users remember important dates, tasks, and events. It offers customizable reminder settings and notifications, ensuring users never miss a crucial deadline or appointment."
    },
    {
      label:"Knowledge",
      name: "Knowledge Node",
      icon:BookOpenIcon,
      type: NodeType.KNOWLEDGE,
      description: "The Knowledge Node serves as a repository for storing and accessing valuable information and resources. It supports various formats including text, images, and multimedia, facilitating knowledge sharing and collaboration among users."
    },
    {
      label:"Condition",
      name: "Condition Node",
      type: NodeType.CONDITION,
      icon:VariableIcon,
      description: "The Condition Node enables users to define conditional logic and rules within the system. It provides a framework for setting up triggers and actions based on specific conditions, automating processes and workflows efficiently."
    },
    {
      label:"SideEffect",
      name: "Side Effect Node",
      type: NodeType.SIDE_EFFECT,
      icon:BoltIcon,
      description: "The Side Effect Node handles secondary or unintended outcomes resulting from system operations. It allows users to anticipate and manage side effects, ensuring smooth and predictable behavior of the system under various scenarios."
    }
  ];
  
 
export function NodeSelectorBar() {
  const [openNav, setOpenNav] = React.useState(false);


  const onDragStart = (event:any, nodeType:any) => {
    event.dataTransfer.setData('reactflow-node', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };


 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
     
      {/* this is a tooltip with descriptions about the NODETYPE */}
      {
        NodeSelectorItems.map((item,index)=>(
         
          <div className="hover:bg-brown-100 cursor-move transition-all duration-500 " key={index}>
              <Tooltip
              
                content={
                  <div className="w-80">
                    <Typography color="yellow" className="font-medium">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal opacity-80"
                    >
                      {item.description}
                    </Typography>
                  </div>
                }
                
              >
                  <Typography
                    as="li"
                    onClick={()=>alert("this is a test .")}
                    // onDragCapture={(event)=>onDragStart(event,'IdeaNode')}
                    variant="small"
                    color="red"
                    onDragStart={(event)=>onDragStart(event,'IdeaNode')} className='flex flex-col justify-center items-center gap-2 bg-stone-800 rounded-[8px] text-stone-200 font-semibold px-2 py-2 cursor-auto ' draggable>
                  <item.icon strokeWidth={2.5} className="h-6 w-6"  color="gray"/>
                  <small className="text-[8px] text-gray-800">{item.label}</small>
                  </Typography>

              
                </Tooltip>
            </div>
            
        ))
      }
     
      
    </ul>
  );
 
  return (
    <Navbar className="mx-auto min-w-full max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-gray-900">
        
        <div className="hidden lg:block">{navList}</div>
        <div className="px-6">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" crossOrigin={undefined} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}