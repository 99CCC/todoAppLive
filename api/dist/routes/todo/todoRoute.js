"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loadTodoController_1 = require("./controller/loadTodoController");
const router = (0, express_1.Router)();
router.get('/loadTodo/:table', loadTodoController_1.validateLoadTodo, loadTodoController_1.loadTodoController);
//router.get('/loadTodoById) possible additions if we want to save space on FE
//router.get('/loadTodoChild)
exports.default = router;
