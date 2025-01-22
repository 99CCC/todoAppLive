import { Router } from "express";
//import { loadTodoTreeController, validateLoadTodoTree } from "./controller/loadTodoTreeController";
import { loadTodoController, validateLoadTodo } from "./controller/loadTodoController";
import { loadTodoChildController, validateLoadTodoChild } from "./controller/loadTodoChildController";
import { deleteTodoController, validateDeleteTodo } from "./controller/deleteTodoController";


const router = Router();

//router.get('/loadTodo/:table', validateLoadTodo, loadTodoController); <-- USES OLD SQL QUERY NEEDS UPDATE

router.get('/loadTodo/:table', validateLoadTodo, loadTodoController); //POSSIBLE: Add a sort tag per item, to have the user be able to sort them themselves
router.post('/loadTodoChild', validateLoadTodoChild, loadTodoChildController); 

//Modifying Parent
router.delete('/deleteTodo/:todoId/:table', validateDeleteTodo, deleteTodoController);
router.put('/archiveTodo/:todoId')
router.put('/updateTodo/:todoId')

//Modifying Child
router.delete('/deleteTodoChild');
router.put('/updateTodoChild')

export default router;
