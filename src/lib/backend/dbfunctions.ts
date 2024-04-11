import { DiagramInputSchema, WorkspaceInputSchema } from "base/types/dbTypes";
import { db } from "./db";
import { auth } from "./auth";
import { slugify } from "../utils";
import { Workspace } from "@prisma/client";



// +++++++++===== Wrokspace database functions ======+++++++++++++++

        //CREATE

export async function getWorkspaceById(workspaceId:string){
    
    let response:object = {message :`failed to fetch workspaces for the workspace id ${workspaceId} from the database`}
    let status = 400;
    
   try{
       let result: any
       
        result  =  await db.workspace.findFirst(
            {
            where:{
                id:workspaceId
            }
        })
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch workspaces for the workspace id ${workspaceId} from the database`}
        
    }

    return {data:response,status:status}

}
export async function getWorkspaceBySlug(workspaceSlug:string){
    
    let response:object = {message :`failed to fetch workspaces for the workspace id ${workspaceSlug} from the database`}
    let status = 400;
    
   try{
       let result: any
       
        result  =  await db.workspace.findFirst(
            {
            where:{
                slug:workspaceSlug
            }
        })
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch workspaces for the workspace id ${workspaceSlug} from the database`}
        
    }

    return {data:response,status:status}

}
export async function getWorkspacesByTeamId(teamId:string){
    
    let response:object = {message :`failed to fetch workspaces for the team id ${teamId} from the database`}
    let status = 400;
    
   try{
       let result: any
       
       result =  await db.workspace.findMany({
            where:{
                teamId:teamId
            }
            
        })
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch workspaces for the team id ${teamId} from the database`}
        
    }

    return {data:response,status:status}

}
export async function getWorkspacesByUserId(userId:string){
    
    let response:object = {message :`failed to fetch workspaces for the user id ${userId} from the database`}
    let status = 400;
    
   try{
       let result: any
       
       result =  await db.workspace.findMany({
            where:{
                creatorId:userId
            }
            
        })
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch workspaces for the user id ${userId} from the database`}
        
    }

    return {data:response,status:status}

}
export async function getWorkspacesBySlug(slug:string){
    let response:object = {message :`failed to fetch workspaces for the workspace name ${slug} from the database`}
    let status = 400;
    try{
        let result: any
        
        result =  await db.workspace.findMany({
             where:{
                 slug:slug
             }
             
         })
       
        if(result){
             response =result;
             status= 200
         }
 
         
     }
     catch(error){
         response = {message :`failed to fetch workspaces for the workspace name ${slug} from the database`}
         
     }
 
     return {data:response,status:status}
 
}
export async function getAllWorkspaces(){
    
    let response:object = {message :`failed to fetch workspaces from the database`}
    let status = 400;
    
   try{
       let result: any
       
       result =  await db.workspace.findMany()
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch workspaces from the database`}
        
    }

    return {data:response,status:status}

}


        //POST
export async function CreateWorspace(WorkspaceData:WorkspaceInputSchema){
    const session  =await auth()
     
    let response:object = {message :`failed to craete workspace`}
    let status = 400;
    
   try{
       let result: any
       
        if(!session){
            response = {message:"unAuthorized request .please signin befor you create a workspace"}
            status:401
        }
        else{
            result  =  await db.workspace.create({
                data:{
                    title:WorkspaceData.workspaceName,
                    slug:slugify(WorkspaceData.workspaceName),
                    description:WorkspaceData.workspaceDescription,
                    cover:WorkspaceData.workspaceCover,
                    creatorId:session.user.id 
                }
            })
           if(result){
                response =result;
                status= 200
            }
        }

        
    }
    catch(error){
        response = {message :`failed to fetch workspaces for the workspace name ${WorkspaceData.workspaceName}`}
        
    }

    return {data:response,status:status}

}




// Team database functions
export async function getTeamById(teamId:string){
    
    let response:object = {message :`failed to fetch team for the team id ${teamId} from the database`}
    let status = 400;
    
   try{
       let result: any
       
        result  =  await db.team.findFirst(
            {
            where:{
                id:teamId
            }
        })
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch team for the team id ${teamId} from the database`}
        
    }

    return {data:response,status:status}

}
export async function getAllTeams(){
    
    let response:object = {message :`failed to fetch diagrams from the database`}
    let status = 400;
    
   try{
       let result: any
       
       result =  await db.diagram.findMany()
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch diagrams from the database`}
        
    }

    return {data:response,status:status}

}



//diagram db functions
export async function getDiagramById(diagramId:string){

    let response:object = {message :`failed to fetch workspaces for the diagram id ${diagramId} from the database`}
    let status = 400;
    
   try{
       let result: any
       
        result  =  await db.diagram.findFirst({
            where:{
                id:diagramId
            }
        })
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch workspaces for the diagram id ${diagramId} from the database`}
        
    }

    return {data:response,status:status}

}



export async function getDiagramsBySlug(slug:string){
    let response:object = {message :`failed to fetch diagram for the workspace name ${slug} from the database`}
    let status = 400;
    try{
        let result: any
        
        result =  await db.diagram.findMany({
             where:{
                 slug:slug
             }
             
         })
       
        if(result){
             response =result;
             status= 200
         }
 
         
     }
     catch(error){
         response = {message :`failed to fetch diagram for the workspace name ${slug} from the database`}
         
     }
 
     return {data:response,status:status}
}


export async function getDiagramsByUserId(userId:string){
        
    let response:object = {message :`failed to fetch diagrams for the user id ${userId} from the database`}
    let status = 400;
    
   try{
       let result: any
       
        result  =  await db.diagram.findMany({
            where:{
                creatorId:userId
            }
        })
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch diagrams for the user id ${userId} from the database`}
        
    }

    return {data:response,status:status}
}



export async function getDiagramsByWorkspaceId(workspaceId:string){
        
    let response:object = {message :`failed to fetch diagram for the workspace id ${workspaceId} from the database`}
    let status = 400;
    
   try{
       let result: any
       
        result  =  await db.diagram.findMany(
            {
            where:{
                workspaceId:workspaceId
                }

        })
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch diagram for the workspace id ${workspaceId} from the database`}
        
    }

    return {data:response,status:status}
}

export async function getDiagramsByWorkspaceSlug(workspaceSlug:string){
    let response:object = {message :`failed to fetch diagram for the workspace id ${workspaceSlug} from the database`}
    let status = 400;
    
   try{
       let result: any

       let {data,status} =  await getWorkspaceBySlug(workspaceSlug)
       const workspace:Workspace  = data as Workspace
       
        result  =  await db.diagram.findMany(
            {
            where:{
                workspaceId:workspace.id
                }

        })
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch diagram for the workspace id ${workspaceSlug} from the database`}
        
    }

    return {data:response,status:status}
}


export async function getAllDiagrams(){
    let response:object = {message :`failed to fetch teams from the database`}
    let status = 400;
    
   try{
       let result: any
       
       result =  await db.team.findMany()
      
       if(result){
            response =result;
            status= 200
        }

        
    }
    catch(error){
        response = {message :`failed to fetch team from the database`}
        
    }

    return {data:response,status:status}

}



export async function CreateDiagram(diagramData:DiagramInputSchema){
    const session  =await auth()
     
    let response:object = {message :`failed to create Diagram`}
    let status = 400;
    
   try{
       let result: any
       
        if(!session){
            response = {message:"unAuthorized request .please signin befor you create a workspace"}
            status:401
        }
        else{
            result  =  await db.diagram.create({
                data:{
                    title:diagramData.title,
                    description:diagramData.description,
                    coverImage:diagramData.coverImage,
                    slug:slugify(diagramData.title),
                    metadata:diagramData.description,
                    type:diagramData.type,

                    creatorId:session.user.id,
                    workspaceId:diagramData.workspaceId

                }
            })
           if(result){
                response =result;
                status= 200
            }
        }

        
    }
    catch(error){
        response = {message :`failed to creat diagram the Diagram name `+JSON.stringify(error)}
        console.log(error)
        
    }

    return {data:response,status:status}

}