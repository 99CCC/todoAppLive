import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { body, param } from "express-validator";
import { deleteTodoModel } from "../model/deleteTodoModel";
import { errorHandler } from "../../../middleware/errorHandler";
import { validateRequest } from "../../../middleware/validateRequest";

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
        .withMessage("param 'table' must be in ['active', 'archive']"),
    body("depth")
        .optional()
        .notEmpty()
        .withMessage("param 'type' is required"),
        validateRequest
];
///deleteTodo/:todoId/:table/:type/:depth
export async function deleteTodoController(req: AuthenticatedRequest, res: Response): Promise<void>{ 
    try {
        const userId = req.user?.userId;
        console.log("test", userId);
        if(userId === undefined){
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        
        const todoId = parseInt(req.params.todoId);
        const table = req.params.table;
        const depth = req.body.depth;
        console.log("inputdepth in controller: ", depth);
        const modelRes = await deleteTodoModel(userId, todoId, table, depth);

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