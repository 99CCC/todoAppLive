"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRestoreTodo = void 0;
exports.restoreTodoController = restoreTodoController;
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../../../middleware/errorHandler");
const restoreTodoModel_1 = require("../model/restoreTodoModel");
exports.validateRestoreTodo = [
    (0, express_validator_1.param)("todoId")
        .notEmpty()
        .withMessage("param 'todoId' is required")
];
async function restoreTodoController(req, res) {
    try {
        const userId = req.user?.userId;
        if (userId === undefined) {
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        const todoId = parseInt(req.params.todoId);
        const modelRes = await (0, restoreTodoModel_1.restoreTodoModel)(userId, todoId);
        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
            return;
        }
        else {
            res.status(modelRes.status ?? 500).json(modelRes ?? "Model unresolved error");
        }
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
