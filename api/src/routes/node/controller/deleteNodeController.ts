import { RequestHandler, Response } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../../middleware/validateRequest";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { errorHandler } from "../../../middleware/errorHandler";
import { deleteNodeModel } from "../model/deleteNodeModel";

export const validateDeleteNode: RequestHandler[] = [
    param("nodeId")
        .notEmpty()
        .withMessage("param 'nodeId' is required"),
        validateRequest
];

export async function deleteNodeController(req: AuthenticatedRequest, res: Response){
try {

    const nodeId = parseInt(req.params.nodeId);
    const modelRes = await deleteNodeModel(nodeId);
    
    if(modelRes.checkFlag){
        res.status(200).json(modelRes);
        return;
    }

    res.status(modelRes.status ?? 500).json(modelRes.message ?? "Unresolved error from Model");
    
} catch (error) {
    const errorResponse = await errorHandler(error);
    res.status(errorResponse.status).json(errorResponse)
}
}