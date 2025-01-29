"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoadTodo = void 0;
exports.loadTodoController = loadTodoController;
const errorHandler_1 = require("../../../middleware/errorHandler");
const express_validator_1 = require("express-validator");
const loadTodoModel_1 = require("../model/loadTodoModel");
const validateRequest_1 = require("../../../middleware/validateRequest");
exports.validateLoadTodo = [
    (0, express_validator_1.param)("table")
        .notEmpty()
        .withMessage("Param 'table' is required")
        .isIn(["active", "archive"])
        .withMessage("Param must be in ['active', archive']"),
    validateRequest_1.validateRequest
];
async function loadTodoController(req, res) {
    try {
        const userId = req.user?.userId;
        const table = req.params.table;
        if (userId === undefined) {
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        const modelRes = await (0, loadTodoModel_1.loadTodoModel)(table, userId);
        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
            return;
        }
        res.status(modelRes.status ?? 500).json(modelRes.message || "Internal server error");
        return;
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
