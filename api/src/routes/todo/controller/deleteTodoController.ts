import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { param } from "express-validator";
import { deleteTodoModel } from "../model/deleteTodoModel";
import { errorHandler } from "../../../middleware/errorHandler";

export const validateDeleteTodo: RequestHandler[] = [
    param("todoId")
        .notEmpty()
        .withMessage("param 'todoId' is required")
        .isNumeric()
        .withMessage("param 'todoId' must be numeric"),
    param("table")
        .notEmpty()
        .withMessage("param 'table' is required")
        .isIn(["active", "archive"])
        .withMessage("param 'table' must be in ['active', 'archive']")
]

export async function deleteTodoController(req: AuthenticatedRequest, res: Response): Promise<void>{ 
    try {
        const userId = req.user?.userId;
        if(userId === undefined){
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        
        const todoId = parseInt(req.params.todoId);
        const table = req.params.table;

        const modelRes = await deleteTodoModel(userId, todoId, table);

        if(modelRes.checkFlag){
            res.status(200).json(modelRes);
            return;
        }

        res.status(modelRes.status ?? 500).json(modelRes.message ?? "Unknown error");

    } catch (error) {
        const errorResponse = await errorHandler(error);
        res.status(errorResponse.status).json(errorResponse)
    }
}