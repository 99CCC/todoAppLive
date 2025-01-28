import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { param } from "express-validator";
import { errorHandler } from "../../../middleware/errorHandler";
import { restoreTodoModel } from "../model/restoreTodoModel";
import { validateRequest } from "../../../middleware/validateRequest";

export const validateRestoreTodo: RequestHandler[] = [
    param("todoId")
        .notEmpty()
        .withMessage("param 'todoId' is required"),
        validateRequest
]

export async function restoreTodoController(req: AuthenticatedRequest, res: Response): Promise<void>{
    try {

        const userId = req.user?.userId;
        if(userId === undefined){
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }

        const todoId = parseInt(req.params.todoId);

        const modelRes = await restoreTodoModel(userId, todoId);

        if(modelRes.checkFlag){
            res.status(200).json(modelRes);
            return
        }else{
            res.status(modelRes.status ?? 500).json(modelRes ?? "Model unresolved error")
        }
        
    } catch (error) {
        const errorResponse = await errorHandler(error);
        res.status(errorResponse.status).json(errorResponse)
    }

}