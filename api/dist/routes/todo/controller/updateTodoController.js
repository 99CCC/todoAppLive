"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTodo = void 0;
exports.updateTodoController = updateTodoController;
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("../../../middleware/errorHandler");
const updateTodoChildModel_1 = require("../model/updateTodoModel/updateTodoChildModel");
const updateTodoParentModel_1 = require("../model/updateTodoModel/updateTodoParentModel");
const validateRequest_1 = require("../../../middleware/validateRequest");
exports.validateUpdateTodo = [
    (0, express_validator_1.body)("todoId")
        .notEmpty()
        .withMessage("field 'todoId' is required"),
    validateRequest_1.validateRequest
];
/*
userId: number, todoId: number,
title?: string,
completed?: boolean*/
async function updateTodoController(req, res) {
    try {
        const userId = req.user?.userId;
        if (userId === undefined) {
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        if (req.body.depth) {
            const todoId = req.body.todoId;
            const depth = req.body.depth;
            const title = req.body.title;
            const body = req.body.body;
            const completed = req.body.completed;
            const modelRes = await (0, updateTodoChildModel_1.updateTodoChildModel)(userId, todoId, depth, title, body, completed);
            if (modelRes.checkFlag) {
                res.status(200).json(modelRes);
                return;
            }
            else {
                res.status(modelRes.status ?? 500).json(modelRes.message ?? "Model Unresolved no error thrown");
                return;
            }
        }
        else {
            const todoId = req.body.todoId;
            const title = req.body.title;
            const completed = req.body.completed;
            const modelRes = await (0, updateTodoParentModel_1.updateTodoParentModel)(userId, todoId, title, completed);
            if (modelRes.checkFlag) {
                res.status(200).json(modelRes);
                return;
            }
            else {
                res.status(modelRes.status ?? 500).json(modelRes.message ?? "Model Unresolved no error thrown");
                return;
            }
        }
    }
    catch (error) {
        const errorResponse = await (0, errorHandler_1.errorHandler)(error);
        res.status(errorResponse.status).json(errorResponse);
    }
}
