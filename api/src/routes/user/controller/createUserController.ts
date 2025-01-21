import { Request, RequestHandler, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../middleware/validateRequest";
import { errorHandler } from "../../../middleware/errorHandler";
import { createUserModel } from "../model/createUserModel";

export const validateCreateUser: RequestHandler[] = [
    body("username")
        .notEmpty()
        .withMessage("Field 'username' is required"),
    body("password")
        .notEmpty()
        .withMessage("Field 'password' is required"),
    validateRequest,
]

export async function createUserController(req: Request, res: Response): Promise<void>{
    try {
        console.log("controller reached");
        const username = req.body.username;
        const password = req.body.password;

        const modelRes = await createUserModel(username, password);

        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
        } else {
            res.status(400).json(modelRes);
        }
    } catch (error: any) {
        const errorResponse = await errorHandler(error);
        res.status(errorResponse.status).json(errorResponse)
    }
}