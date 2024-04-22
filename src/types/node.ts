import IdeaNode from "base/app/components/reactflow/nodes/IdeaNode";
import CustomNode from "base/app/components/reactflow/nodes/customNode";
import { NodeProps } from "reactflow";

type LOGICAL_CONNECTOR = 'AND' | 'OR' | 'NOT' ;
type DOCUMENT_TYPE = 'pdf' | 'doc' | 'xls' | 'ppt' | 'txt' ;


export type ConditinalNodeData  = {
        label:string
        connector:LOGICAL_CONNECTOR
        eventName:string
        eventTrigger:()=>any
        value:any
        output:boolean
        description:string

    }



export type  DocumentNodeData = {
        label:string
        description:string
        exposable:any[]
        documentType:DOCUMENT_TYPE
        documentUrl:string
        documentSize:number
        documentTitle:string;
        output:any //this will be used to output any exposable data
        thumbnailUrl:string
    
}

export type KnowledgeNodeData ={
        label:string 
        description:string
        thumbnailUrl:string
        reasonings:string[]
        facts:string[]
        ideas:string[]
    }



export type ScheduleNodeType ={
        label:string
        description:string
        scheduleDate:Date
        scheduleTime:string
        scheduleTimeZone:string
        output:any
        eventName:string
        eventTrigger:()=>any

    }
 

//this is just behasab dereja 
export type IdeaNodeType = NodeProps & {
    data:{
        label:string
        description:string
        reasonings:string[]
        tasks:string[]
    }
}   

