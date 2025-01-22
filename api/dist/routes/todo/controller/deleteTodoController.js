"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteTodo = void 0;
exports.deleteTodoController = deleteTodoController;
const express_validator_1 = require("express-validator");
const deleteTodoModel_1 = require("../model/deleteTodoModel");
const errorHandler_1 = require("../../../middleware/errorHandler");
exports.validateDeleteTodo = [
    (0, express_validator_1.param)("todoId")
        .notEmpty()
        .withMessage("param 'todoId' is required")
        .isNumeric()
        .withMessage("param 'todoId' must be numeric"),
    (0, express_validator_1.param)("table")
        .notEmpty()
        .withMessage("param 'table' is required")
        .isIn(["active", "archive"])
        .withMessage("param 'table' must be in ['active', 'archive']")
];
async function deleteTodoController(req, res) {
    try {
        const userId = req.user?.userId;
        if (userId === undefined) {
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        const todoId = parseInt(req.params.todoId);
        const table = req.params.table;
        const modelRes = await (0, deleteTodoModel_1.deleteTodoModel)(userId, todoId, table);
        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
            return;
        }
        res.status(modelRes.status ?? 500).json(modelRes.message ?? "Unknown error");
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
