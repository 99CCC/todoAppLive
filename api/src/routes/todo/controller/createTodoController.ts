import { Response } from "express";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { errorHandler } from "../../../middleware/errorHandler";
import { createTodoChildModel } from "../model/createTodoModel/createTodoChildModel";
import { createTodoParentModel } from "../model/createTodoModel/createTodoParentModel";



export async function createTodoController(req: AuthenticatedRequest, res: Response): Promise<void>{
    try{

        const userId = req.user?.userId;
        if(userId === undefined){
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }

        if(req.body.todoId){
            const todoId: number = req.body.todoId;
            const depth: number[] = req.body.depth;
            const title: string = req.body.title;
            const completed: boolean = req.body.completed;
            
            const modelRes = await createTodoChildModel(userId, todoId, depth, title, completed);

            if(modelRes.checkFlag){
                res.status(200).json(modelRes);
                return;
            }else{
                res.status(modelRes.status ?? 500).json(modelRes.message ?? "Model Unresolved no error thrown");
                return
            }
        }else{
            const title: string = req.body.title !== undefined ? req.body.title : "New Todo Object";
            
            const modelRes = await createTodoParentModel(userId, title);

            if(modelRes.checkFlag){
                res.status(200).json(modelRes);
                return;
            }else{
                res.status(modelRes.status ?? 500).json(modelRes.message ?? "Model Unresolved no error thrown");
                return
            }
        }

    }catch(error){
                const errorResponse = await errorHandler(error);
                res.status(errorResponse.status).json(errorResponse)
    }
}