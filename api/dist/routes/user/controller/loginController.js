"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
exports.loginController = loginController;
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../../../middleware/validateRequest");
const errorHandler_1 = require("../../../middleware/errorHandler");
const loginModel_1 = require("../model/loginModel");
exports.validateLogin = [
    (0, express_validator_1.body)("username")
        .notEmpty()
        .withMessage("Field 'username' is required"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Field 'password' is required"),
    validateRequest_1.validateRequest,
];
async function loginController(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const modelRes = await (0, loginModel_1.loginModel)(username, password);
        if (modelRes.checkFlag) {
            res.status(200).json(modelRes);
            return;
        }
        else {
            res.status(400).json(modelRes);
            return;
        }
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
