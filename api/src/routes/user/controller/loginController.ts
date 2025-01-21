import { Request, RequestHandler, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../middleware/validateRequest";
import { errorHandler } from "../../../middleware/errorHandler";
import { loginModel } from "../model/loginModel";

export const validateLogin: RequestHandler[] = [
    body("username")
        .notEmpty()
        .withMessage("Field 'username' is required"),
    body("password")
        .notEmpty()
        .withMessage("Field 'password' is required"),
    validateRequest,
]

export async function loginController(req: Request, res: Response): Promise<void>{
    try {
        const username = req.body.username;
        const password = req.body.password;

        const modelRes = await loginModel(username, password);

        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
            return;
        } else {
            res.status(400).json(modelRes);
            return;
        }
    } catch (error: any) {
        const errorResponse = await errorHandler(error);
        res.status(errorResponse.status).json(errorResponse)
    }
}