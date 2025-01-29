"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateNode = void 0;
exports.updateNodeController = updateNodeController;
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../../../middleware/validateRequest");
const errorHandler_1 = require("../../../middleware/errorHandler");
const updateNodeModel_1 = require("../model/updateNodeModel");
exports.validateUpdateNode = [
    (0, express_validator_1.param)("nodeId")
        .notEmpty()
        .withMessage("param 'nodeId' is required"),
    (0, express_validator_1.body)("body")
        .optional()
        .isString()
        .withMessage("Invalid datatype: 'body' must be string"),
    (0, express_validator_1.body)("completed")
        .optional()
        .isBoolean()
        .withMessage("Invalid datatype: 'completed' must be boolean"),
    validateRequest_1.validateRequest
];
async function updateNodeController(req, res) {
    try {
        const nodeId = parseInt(req.params.nodeId);
        const body = req.body.body;
        const completed = req.body.completed;
        let input = {};
        body !== undefined && (input.body = body);
        completed !== undefined && (input.completed = completed);
        const modelRes = await (0, updateNodeModel_1.updateNodeModel)(input, nodeId);
        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
            return;
        }
        res.status(modelRes.status ?? 500).json(modelRes.message ?? "Unresolved internal error");
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
