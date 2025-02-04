"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoController = createTodoController;
const errorHandler_1 = require("../../../middleware/errorHandler");
const createTodoChildModel_1 = require("../model/createTodoModel/createTodoChildModel");
const createTodoParentModel_1 = require("../model/createTodoModel/createTodoParentModel");
async function createTodoController(req, res) {
    try {
        const userId = req.user?.userId;
        if (userId === undefined) {
            res.status(401).json("Unauthorized/Possible missing credentials");
            return;
        }
        if (req.body.todoId) {
            const todoId = req.body.todoId;
            const depth = req.body.depth;
            const title = req.body.title;
            const completed = req.body.completed;
            const modelRes = await (0, createTodoChildModel_1.createTodoChildModel)(userId, todoId, depth, title, completed);
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
            const title = req.body.title !== undefined ? req.body.title : "New Todo Object";
            const modelRes = await (0, createTodoParentModel_1.createTodoParentModel)(userId, title);
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
