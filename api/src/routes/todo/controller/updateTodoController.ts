import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { body } from "express-validator";
import { errorHandler } from "../../../middleware/errorHandler";
import { updateTodoChildModel } from "../model/updateTodoModel/updateTodoChildModel";
import { updateTodoParentModel } from "../model/updateTodoModel/updateTodoParentModel";
import { validateRequest } from "../../../middleware/validateRequest";

export const validateUpdateTodo: RequestHandler[] = [
    body("todoId")
        .notEmpty()
        .withMessage("field 'todoId' is required"),
        validateRequest
]
/*
userId: number, todoId: number,
title?: string,
completed?: boolean*/
export async function updateTodoController(req: AuthenticatedRequest, res: Response): Promise<void>{
    try{

        const userId = req.user?.userId;
        if(userId === undefined){
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }

        if(req.body.depth){
            const todoId: number = req.body.todoId;
            const depth: number[] = req.body.depth;
            const title: string = req.body.title;
            const body: string = req.body.body;
            const completed: boolean = req.body.completed;
            
            const modelRes = await updateTodoChildModel(userId, todoId, depth, title, body, completed);

            if(modelRes.checkFlag){
                res.status(200).json(modelRes);
                return;
            }else{
                res.status(modelRes.status ?? 500).json(modelRes.message ?? "Model Unresolved no error thrown");
                return
            }
        }else{
            const todoId: number = req.body.todoId;
            const title: string = req.body.title;
            const completed: boolean = req.body.completed;
            
            const modelRes = await updateTodoParentModel(userId, todoId, title, completed);

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