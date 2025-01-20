"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
async function errorHandler(err) {
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
