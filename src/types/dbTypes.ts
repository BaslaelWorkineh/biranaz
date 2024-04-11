import { DiagramType } from "@prisma/client"

export type WorkspaceInputSchema  = {
    workspaceName:string,
    workspaceDescription:string,
    workspaceCover:string
}

export type DiagramInputSchema =  {
    title:string,
    description:string,
    coverImage:string,
    metadata:JSON
    type:DiagramType,
    workspaceId:string

}