"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateNode = void 0;
exports.createNodeController = createNodeController;
const errorHandler_1 = require("../../../middleware/errorHandler");
const createNodeModel_1 = require("../model/createNodeModel");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../../../middleware/validateRequest");
exports.validateCreateNode = [
    (0, express_validator_1.body)("depth")
        .notEmpty()
        .withMessage("field 'depth' is required"),
    validateRequest_1.validateRequest
];
async function createNodeController(req, res) {
    try {
        const userId = req.user?.userId;
        if (userId === undefined) {
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        const depth = req.body.depth;
        const modelRes = await (0, createNodeModel_1.createNodeModel)(depth);
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
