import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/features.js";



export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {

    const message = err.message || "Internal server error";
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message,
    })
}