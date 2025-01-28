"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createNodeController_1 = require("./controller/createNodeController");
//import { loadTodoTreeController, validateLoadTodoTree } from "./controller/loadTodoTreeController";
const router = (0, express_1.Router)();
//router.get('/loadTodo/:table', validateLoadTodo, loadTodoController); 
router.post('/createNode', createNodeController_1.validateCreateNode, createNodeController_1.createNodeController);
exports.default = router;
