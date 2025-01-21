"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoadTodo = void 0;
exports.loadTodoController = loadTodoController;
const errorHandler_1 = require("../../../middleware/errorHandler");
const express_validator_1 = require("express-validator");
const loadTodoModel_1 = require("../model/loadTodoModel");
exports.validateLoadTodo = [
    (0, express_validator_1.param)("table")
        .notEmpty()
        .withMessage("param 'table' is required")
];
async function loadTodoController(req, res) {
    try {
        const table = req.params.table;
        const user = req.user?.userId;
        console.log(user);
        if (user === undefined) {
            res.status(500).json({ message: "User ID not found" });
            return;
        }
        const modelRes = await (0, loadTodoModel_1.loadTodoModel)(user, table);
        if (modelRes.checkFlag) {
            res.status(200).json({ modelRes });
        }
        else {
            res.status(modelRes.status ?? 500).json({ modelRes });
        }
        return;
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
