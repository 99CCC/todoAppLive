import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { body } from "express-validator";
import { errorHandler } from "../../../middleware/errorHandler";
import { loadTodoChildModel } from "../model/loadTodoChildModel";
import { validateRequest } from "../../../middleware/validateRequest";

export const validateLoadTodoChild: RequestHandler[] = [
    body("todoId")
        .notEmpty()
        .withMessage("field 'todoId' is required")
        .isNumeric()
        .withMessage("field 'todoId' must be numeric"),
    body("type")
        .notEmpty()
        .withMessage("field 'type' is required")
        .isIn(["parent", "child"])
        .withMessage("field 'type' must be part of ['parent', 'child']"),
    body("depth")
        .if(body("type").equals("child"))
        .notEmpty()
        .withMessage("field 'depth' is required")
        .isArray()
        .withMessage("field 'depth' must"),
    body("table")
        .notEmpty()
        .withMessage("field 'tableInput' is required")
        .isIn(["active", "archive"])
        .withMessage("field 'table' must be part of ['active', 'archive']"),
        validateRequest
]

//todoId: number, type: string, depth: number[], tableInput: string, userId: number
export async function loadTodoChildController(req: AuthenticatedRequest, res: Response): Promise<void>{
    try {
    
        const userId = req.user?.userId;
        if(userId === undefined){
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        const todoId = parseInt(req.body.todoId);
        const type = req.body.type;
        const depth = req.body.depth;
        const table = req.body.table;

        const modelRes = await loadTodoChildModel(todoId, type, depth, table, userId);

        if(modelRes.checkFlag){
            res.status(200).json(modelRes);
            return;
        }

        res.status(modelRes.status ?? 500).json(modelRes ?? "internal server error");        

    } catch (error) {
        const errorResponse = await errorHandler(error);
        res.status(errorResponse.status).json(errorResponse)
    }
}