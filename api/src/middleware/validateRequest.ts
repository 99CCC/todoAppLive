import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";


export async function validateRequest(req: Request, res: Response, next: NextFunction): Promise<void>{
    const errors: Result<ValidationError> = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "Validation Errors",
            details: errors.array().map((err) => ({message: err.msg}))
        });
        return;
    }
    next();
}