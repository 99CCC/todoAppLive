"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const express_validator_1 = require("express-validator");
async function validateRequest(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "Validation Errors",
            details: errors.array().map((err) => ({ message: err.msg }))
        });
        return;
    }
    next();
}
