"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoadTodoChild = void 0;
exports.loadTodoChildController = loadTodoChildController;
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../../../middleware/errorHandler");
const loadTodoChildModel_1 = require("../model/loadTodoChildModel");
exports.validateLoadTodoChild = [
    (0, express_validator_1.body)("todoId")
        .notEmpty()
        .withMessage("field 'todoId' is required")
        .isNumeric()
        .withMessage("field 'todoId' must be numeric"),
    (0, express_validator_1.body)("type")
        .notEmpty()
        .withMessage("field 'type' is required")
        .isIn(["parent", "child"])
        .withMessage("field 'type' must be part of ['parent', 'child']"),
    (0, express_validator_1.body)("depth")
        .if((0, express_validator_1.body)("type").equals("child"))
        .notEmpty()
        .withMessage("field 'depth' is required")
        .isArray()
        .withMessage("field 'depth' must"),
    (0, express_validator_1.body)("table")
        .notEmpty()
        .withMessage("field 'tableInput' is required")
        .isIn(["active", "archive"])
        .withMessage("field 'table' must be part of ['active', 'archive']")
];
//todoId: number, type: string, depth: number[], tableInput: string, userId: number
async function loadTodoChildController(req, res) {
    try {
        const userId = req.user?.userId;
        if (userId === undefined) {
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        const todoId = parseInt(req.body.todoId);
        const type = req.body.type;
        const depth = req.body.depth;
        const table = req.body.table;
        const modelRes = await (0, loadTodoChildModel_1.loadTodoChildModel)(todoId, type, depth, table, userId);
        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
            return;
        }
        res.status(modelRes.status ?? 500).json(modelRes ?? "internal server error");
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
