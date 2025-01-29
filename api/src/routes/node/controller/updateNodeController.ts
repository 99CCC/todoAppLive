import { RequestHandler, Response } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../../middleware/validateRequest";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { errorHandler } from "../../../middleware/errorHandler";
import { updateNodeModel } from "../model/updateNodeModel";


export const validateUpdateNode: RequestHandler[] = [
    param("nodeId")
        .notEmpty()
        .withMessage("param 'nodeId' is required"),
    body("body")
        .optional()
        .isString()
        .withMessage("Invalid datatype: 'body' must be string"),
    body("completed")
        .optional()
        .isBoolean()
        .withMessage("Invalid datatype: 'completed' must be boolean"),
        validateRequest
];

export async function updateNodeController(req: AuthenticatedRequest, res: Response){
    try {
        const nodeId = parseInt(req.params.nodeId);
        const body = req.body.body;
        const completed = req.body.completed;

        let input: any = {};
    
        body !== undefined && (input.body = body);
        completed !== undefined && (input.completed = completed);
        
        const modelRes = await updateNodeModel(input, nodeId);

        if(modelRes.checkFlag){
            res.status(200).json(modelRes);
            return;
        }
        res.status(modelRes.status ?? 500).json(modelRes.message ?? "Unresolved internal error");

    } catch (error) {
                const errorResponse = await errorHandler(error);
                res.status(errorResponse.status).json(errorResponse)
    }
}