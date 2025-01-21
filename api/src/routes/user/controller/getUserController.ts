import { body } from "express-validator";
import { AuthenticatedRequest } from "../../../sharedInterface/AuthenticatedRequest.js";
import { Request, RequestHandler, Response } from 'express';
import { getUserModel } from "../model/getUserModel.js";
import { errorHandler } from "../../../middleware/errorHandler.js";

export const validateGetUser: RequestHandler[] = [
    body("username")
        .isEmpty()
        .withMessage("field 'username' is required")
]

export async function getUserController(req: AuthenticatedRequest, res: Response):Promise<void>{
try {
    const userId = req.user?.userId;
    if(userId != 0){
        res.status(401).json({message: "Unauthorized"});
    }

    const username = req.body.username;
    const modelRes = await getUserModel(username);

    if(modelRes.checkFlag){
        res.status(200).json({modelRes});
    }else{
        res.status(500).json({modelRes});
    }

} catch (error) {
        const errorResponse = await errorHandler(error);
        res.status(errorResponse.status).json(errorResponse)
}
}