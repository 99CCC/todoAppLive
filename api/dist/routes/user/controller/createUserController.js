"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateUser = void 0;
exports.createUserController = createUserController;
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../../../middleware/validateRequest");
const errorHandler_1 = require("../../../middleware/errorHandler");
const createUserModel_1 = require("../model/createUserModel");
exports.validateCreateUser = [
    (0, express_validator_1.body)("username")
        .notEmpty()
        .withMessage("Field 'username' is required"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Field 'password' is required"),
    validateRequest_1.validateRequest,
];
async function createUserController(req, res) {
    try {
        console.log("controller reached");
        const username = req.body.username;
        const password = req.body.password;
        const modelRes = await (0, createUserModel_1.createUserModel)(username, password);
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
