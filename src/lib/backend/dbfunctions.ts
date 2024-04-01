import { WorkspaceInputSchema } from "base/types/dbTypes";
import { db } from "./db";
import { auth } from "./auth";



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
export async function getWorkspacesByName(name:string){
    let response:object = {message :`failed to fetch workspaces for the workspace name ${name} from the database`}
    let status = 400;
    try{
        let result: any
        
        result =  await db.workspace.findMany({
             where:{
                 title:name
             }
             
         })
       
        if(result){
             response =result;
             status= 200
         }
 
         
     }
     catch(error){
         response = {message :`failed to fetch workspaces for the workspace name ${name} from the database`}
         
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