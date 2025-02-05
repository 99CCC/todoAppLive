"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoadNode = void 0;
exports.loadNodeController = loadNodeController;
const errorHandler_1 = require("../../../middleware/errorHandler");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../../../middleware/validateRequest");
const loadNodeModel_1 = require("../model/loadNodeModel");
exports.validateLoadNode = [
    (0, express_validator_1.body)("depth")
        .notEmpty()
        .withMessage("field 'depth' is required"),
    (0, express_validator_1.body)("todoId")
        .notEmpty()
        .withMessage("field 'todoId' is required"),
    validateRequest_1.validateRequest
];
async function loadNodeController(req, res) {
    try {
        const userId = req.user?.userId;
        if (userId === undefined) {
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        const depth = req.body.depth;
        const todoId = req.body.todoId;
        const modelRes = await (0, loadNodeModel_1.loadNodeModel)(depth, todoId);
        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
            return;
        }
        else {
            res.status(modelRes.status ?? 500).json(modelRes.message ?? "Model Unresolved no error thrown");
            return;
        }
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
