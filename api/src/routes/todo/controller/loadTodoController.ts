import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { errorHandler } from "../../../middleware/errorHandler";
import { param } from "express-validator";
import { loadTodoModel } from "../model/loadTodoModel";

export const validateLoadTodo: RequestHandler[] = [
    param("table")
        .notEmpty()
        .withMessage("Param 'table' is required")
        .isIn(["active", "archive"])
        .withMessage("Param must be in ['active', archive']")
]

export async function loadTodoController(req: AuthenticatedRequest, res: Response): Promise<void>{
    try {
        const userId = req.user?.userId;
        const table = req.params.table;
        if(userId === undefined){
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
          const modelRes = await loadTodoModel(table, userId);

          if(modelRes.checkFlag){
            res.status(200).json(modelRes);
            return;
          }
        
          res.status(modelRes.status ?? 500).json(modelRes.message || "Internal server error");
          return;

    } catch (error) {
        const errorResponse = await errorHandler(error);
        res.status(errorResponse.status).json(errorResponse)
    }
}