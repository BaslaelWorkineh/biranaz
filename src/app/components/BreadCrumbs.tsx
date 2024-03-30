"use client"

import { Breadcrumbs } from "@material-tailwind/react";
import { usePathname} from "next/navigation";
import { useEffect, useState } from "react";

type Crumb  = {
    name:string,
    path:string
}
 
export function Breadcrumb() {
    const currentPath =  usePathname()
    const [breadCrumbs,setBreadCrumbs]=useState<Crumb[]>([])

    useEffect(()=>{
        const pathNames =currentPath.split('/').filter((path)=>path);
        const crumbs = pathNames.map((_, index) => ({
            path: `/${pathNames.slice(0, index + 1).join('/')}`,
            name: pathNames[index],
          }));
        setBreadCrumbs(crumbs)
    },[currentPath])
  return (
    <Breadcrumbs>
      <a href="#" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>
    
      {
        breadCrumbs.map((crumb)=>(
            <a key={crumb.name} href={crumb.path} className="opacity-60">
                <span>{crumb.name}</span>
            </a>
        ))
      }
    </Breadcrumbs>
  );
}


export function BreadcrumbFallback(){
return (
  <Breadcrumbs>
      <a href="#" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>

      {
      [1,2,3,4].map((crumb,index)=>(
            
              <span className="w-14 h-2 animate-pulse rounded-lg bg-[#9d9a9a]"/>

        ))
      }
</Breadcrumbs>
)
}