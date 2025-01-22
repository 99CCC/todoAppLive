import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { errorHandler } from "../../../middleware/errorHandler";
import { param } from "express-validator";
import { loadTodoModelTree } from "../model/loadTodoTreeModel";

export const validateLoadTodoTree: RequestHandler[] = [
    param("table")
    .notEmpty()
    .withMessage("param 'table' is required")
]

export async function loadTodoTreeController(req: AuthenticatedRequest, res: Response): Promise<void>{
    try {
        const table = req.params.table;
        const user = req.user?.userId;
        console.log(user);
        
        if(user === undefined){
            res.status(500).json({message: "User ID not found"});
            return;
        }

        const modelRes = await loadTodoModelTree(user, table);

        if(modelRes.checkFlag){
            res.status(200).json({modelRes});
        }else{
            res.status(modelRes.status ?? 500).json({modelRes});
        }
        return;
    } catch (error) {
        const errorResponse = await errorHandler(error);
        res.status(errorResponse.status).json(errorResponse)
    }
}