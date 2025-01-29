"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoadTodoTree = void 0;
exports.loadTodoTreeController = loadTodoTreeController;
const errorHandler_1 = require("../../../middleware/errorHandler");
const express_validator_1 = require("express-validator");
const loadTodoTreeModel_1 = require("../model/loadTodoTreeModel");
const validateRequest_1 = require("../../../middleware/validateRequest");
exports.validateLoadTodoTree = [
    (0, express_validator_1.param)("table")
        .notEmpty()
        .withMessage("param 'table' is required"),
    validateRequest_1.validateRequest
];
async function loadTodoTreeController(req, res) {
    try {
        const table = req.params.table;
        const user = req.user?.userId;
        console.log(user);
        if (user === undefined) {
            res.status(500).json({ message: "User ID not found" });
            return;
        }
        const modelRes = await (0, loadTodoTreeModel_1.loadTodoModelTree)(user, table);
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
