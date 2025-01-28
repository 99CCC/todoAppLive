import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest";
import { errorHandler } from "../../../middleware/errorHandler";
import { createNodeModel } from "../model/createNodeModel";
import { body } from "express-validator";
import { validateRequest } from "../../../middleware/validateRequest";

export const validateCreateNode: RequestHandler[] = [
    body("depth")
        .notEmpty()
        .withMessage("field 'depth' is required"),
        validateRequest
];

export async function createNodeController(req: AuthenticatedRequest, res: Response): Promise<void>{
    try{
        const userId = req.user?.userId;
        if(userId === undefined){
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
            const depth: number[] = req.body.depth;
            const modelRes = await createNodeModel(depth);

            if(modelRes.checkFlag){
                res.status(200).json(modelRes);
                return;
            }else{
                res.status(modelRes.status ?? 500).json(modelRes.message ?? "Model Unresolved no error thrown");
                return
            }

    }catch(error){
                const errorResponse = await errorHandler(error);
                res.status(errorResponse.status).json(errorResponse)
    }
}