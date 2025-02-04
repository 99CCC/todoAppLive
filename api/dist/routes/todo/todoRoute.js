"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { loadTodoTreeController, validateLoadTodoTree } from "./controller/loadTodoTreeController";
const loadTodoController_1 = require("./controller/loadTodoController");
const loadTodoChildController_1 = require("./controller/loadTodoChildController");
const deleteTodoController_1 = require("./controller/deleteTodoController");
const updateTodoController_1 = require("./controller/updateTodoController");
const createTodoController_1 = require("./controller/createTodoController");
const restoreTodoController_1 = require("./controller/restoreTodoController");
const router = (0, express_1.Router)();
//router.get('/loadTodo/:table', validateLoadTodo, loadTodoController); <-- USES OLD SQL QUERY NEEDS UPDATE
router.get('/loadTodo/:table', loadTodoController_1.validateLoadTodo, loadTodoController_1.loadTodoController); //POSSIBLE: Add a sort tag per item, to have the user be able to sort them themselves
router.post('/loadTodoChild', loadTodoChildController_1.validateLoadTodoChild, loadTodoChildController_1.loadTodoChildController);
//Modifying Parent
router.post('/deleteTodo/:todoId/:table/:depth?', deleteTodoController_1.validateDeleteTodo, deleteTodoController_1.deleteTodoController);
router.put('/updateTodo', updateTodoController_1.validateUpdateTodo, updateTodoController_1.updateTodoController);
//Creating parent | child
router.post('/createTodo', createTodoController_1.createTodoController);
router.put('/restoreTodo/:todoId', restoreTodoController_1.validateRestoreTodo, restoreTodoController_1.restoreTodoController);
exports.default = router;
