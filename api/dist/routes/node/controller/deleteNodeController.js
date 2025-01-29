"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteNode = void 0;
exports.deleteNodeController = deleteNodeController;
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../../../middleware/validateRequest");
const errorHandler_1 = require("../../../middleware/errorHandler");
const deleteNodeModel_1 = require("../model/deleteNodeModel");
exports.validateDeleteNode = [
    (0, express_validator_1.param)("nodeId")
        .notEmpty()
        .withMessage("param 'nodeId' is required"),
    validateRequest_1.validateRequest
];
async function deleteNodeController(req, res) {
    try {
        const nodeId = parseInt(req.params.nodeId);
        const modelRes = await (0, deleteNodeModel_1.deleteNodeModel)(nodeId);
        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
            return;
        }
        res.status(modelRes.status ?? 500).json(modelRes.message ?? "Unresolved error from Model");
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
