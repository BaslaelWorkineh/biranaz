'use client'
import { Breadcrumb } from "base/app/components/BreadCrumbs";
import Flow from "base/app/components/reactflow/Flow";
import Image from "next/image";
import { NodeSelectorBar } from "base/app/components/reactflow/NodeSelectorBar";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="bg-transparent w-full" >
      
       <Flow/>
    </div>
  );
}
