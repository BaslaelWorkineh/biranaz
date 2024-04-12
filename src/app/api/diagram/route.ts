import { CreateDiagram, CreateWorspace, getAllDiagrams, getDiagramById, getDiagramBySlug, getDiagramsByUserId,getDiagramsByWorkspaceId,getDiagramsByWorkspaceSlug } from "base/lib/backend/dbfunctions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

    const url  = new URL(req.url)
  const teamId  = url.searchParams.get('team')
  const diagramId =  url.searchParams.get('Diagram')
  const userId =  url.searchParams.get('user')
  const name = url.searchParams.get('name')
  const workspaceId = url.searchParams.get('workspace')
  const workspaceSlug = url.searchParams.get('workspaceSlug')
  const slug = url.searchParams.get('slug')

  console.log("this is the team query params 🎯 ",teamId)
  console.log("this is the Diagram param 🎯 ",diagramId)
  console.log("this is the user param 🎯 ",userId)

  let result:{data:any,status:any}
  if(slug){
    result = await getDiagramBySlug(slug)
  }

  else if(workspaceSlug){
    result  =  await getDiagramsByWorkspaceSlug(workspaceSlug)
  }
  else if(workspaceId){
    result = await getDiagramsByWorkspaceId(workspaceId)
  }
  else if(diagramId){
     result = await getDiagramById(diagramId)  
  }

  else if (userId){
      result = await getDiagramsByUserId(userId)
  }
  else{
     result = await getAllDiagrams()  
  }


  return NextResponse.json(result.data,{status:result.status})
}



export async function POST(req:NextRequest){
  const diagramData =await req.json()
  

  const result = await CreateDiagram(diagramData)

  return NextResponse.json(result)
}

export async function DELETE(req:NextRequest){
    return NextResponse.json({message:"this is a DELETE message from the Diagram api"},{status:201})
}

export async function PUT(req:NextRequest){
    return NextResponse.json({message:"this is a PUT message from the Diagram api"},{status:201})
}

export async function PATCH(req:NextRequest){
    return NextResponse.json({message:"this is a PATCH message from the Diagram api"},{status:201})
}