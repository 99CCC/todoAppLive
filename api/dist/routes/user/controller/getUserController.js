"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetUser = void 0;
exports.getUserController = getUserController;
const express_validator_1 = require("express-validator");
const getUserModel_js_1 = require("../model/getUserModel.js");
const errorHandler_js_1 = require("../../../middleware/errorHandler.js");
exports.validateGetUser = [
    (0, express_validator_1.body)("username")
        .isEmpty()
        .withMessage("field 'username' is required")
];
async function getUserController(req, res) {
    try {
        const userId = req.user?.userId;
        if (userId != 0) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const username = req.body.username;
        const modelRes = await (0, getUserModel_js_1.getUserModel)(username);
        if (modelRes.checkFlag) {
            res.status(200).json({ modelRes });
        }
        else {
            res.status(500).json({ modelRes });
        }
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_js_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
