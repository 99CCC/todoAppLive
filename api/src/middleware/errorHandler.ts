import { NextFunction, Request, Response } from "express";

export async function errorHandler(err: any){
    console.error(err);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const details = err.details || null;

    return {
        status: status,
        error: status === 500 ? "Internal Srver Error" : err.error || "Error",
        message: message,
        details: details
    };
}