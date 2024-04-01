import { CreateWorspace, getAllWorkspaces, getWorkspaceById, getWorkspacesByName, getWorkspacesByTeamId, getWorkspacesByUserId } from "base/lib/backend/dbfunctions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

    const url  = new URL(req.url)
  const teamId  = url.searchParams.get('team')
  const workspaceId =  url.searchParams.get('workspace')
  const userId =  url.searchParams.get('user')
  const name = url.searchParams.get('name')

  console.log("this is the team query params 🎯 ",teamId)
  console.log("this is the workspace param 🎯 ",workspaceId)
  console.log("this is the user param 🎯 ",userId)

  let result:{data:any,status:any}

  if(workspaceId){
     result = await getWorkspaceById(workspaceId)  
  }
  else if(teamId){
      result = await getWorkspacesByTeamId(teamId)
  }
  else if (userId){
      result = await getWorkspacesByUserId(userId)
  }
  else if (name){
    result = await getWorkspacesByName(name)
  }
  else{
     result = await getAllWorkspaces()  
  }


  return NextResponse.json(result.data,{status:result.status})
}

export async function POST(req:NextRequest){
   const WorkspaceData =await req.json()
   

   const result = await CreateWorspace((WorkspaceData))

   return NextResponse.json(result)
}



// export async function DELETE(req:NextRequest){
//     return NextResponse.json({message:"this is a DELETE message from the workspace api"},{status:201})
// }

// export async function PUT(req:NextRequest){
//     return NextResponse.json({message:"this is a PUT message from the workspace api"},{status:201})
// }

// export async function PATCH(req:NextRequest){
//     return NextResponse.json({message:"this is a PATCH message from the workspace api"},{status:201})
// }