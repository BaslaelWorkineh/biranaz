import { getAllTeams, getTeamById } from "base/lib/backend/dbfunctions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

    const url  = new URL(req.url)
  const teamId  = url.searchParams.get('team')


  console.log("this is the team query params 🎯 ",teamId)


  let result:{data:any,status:any}

  if(teamId){
     result = await getTeamById(teamId)  
  }
//   else if(teamId){
//       result = await getTeamsByTeamId(teamId)
//   }
//   else if (userId){
//       result = await getTeamsByUserId(userId)
//   }
  else{
     result = await getAllTeams()  
  }


  return NextResponse.json(result.data,{status:result.status})
}

// export async function POST(req:NextRequest){
//    const postData =await req.json()
   

//    const result = await AddPost((postData as any))

//    return NextResponse.json(result)
// }



// export async function DELETE(req:NextRequest){
//     return NextResponse.json({message:"this is a DELETE message from the Team api"},{status:201})
// }

// export async function PUT(req:NextRequest){
//     return NextResponse.json({message:"this is a PUT message from the Team api"},{status:201})
// }

// export async function PATCH(req:NextRequest){
//     return NextResponse.json({message:"this is a PATCH message from the Team api"},{status:201})
// }