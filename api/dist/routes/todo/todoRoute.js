"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { loadTodoTreeController, validateLoadTodoTree } from "./controller/loadTodoTreeController";
const loadTodoController_1 = require("./controller/loadTodoController");
const loadTodoChildController_1 = require("./controller/loadTodoChildController");
const deleteTodoController_1 = require("./controller/deleteTodoController");
const router = (0, express_1.Router)();
//router.get('/loadTodo/:table', validateLoadTodo, loadTodoController); <-- USES OLD SQL QUERY NEEDS UPDATE
router.get('/loadTodo/:table', loadTodoController_1.validateLoadTodo, loadTodoController_1.loadTodoController); //POSSIBLE: Add a sort tag per item, to have the user be able to sort them themselves
router.post('/loadTodoChild', loadTodoChildController_1.validateLoadTodoChild, loadTodoChildController_1.loadTodoChildController);
//Modifying Parent
router.delete('/deleteTodo/:todoId/:table', deleteTodoController_1.validateDeleteTodo, deleteTodoController_1.deleteTodoController);
router.put('/archiveTodo/:todoId');
router.put('/updateTodo/:todoId');
//Modifying Child
router.delete('/deleteTodoChild');
router.put('/updateTodoChild');
exports.default = router;
