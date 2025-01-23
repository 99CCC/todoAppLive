import { Router } from "express";
//import { loadTodoTreeController, validateLoadTodoTree } from "./controller/loadTodoTreeController";
import { loadTodoController, validateLoadTodo } from "./controller/loadTodoController";
import { loadTodoChildController, validateLoadTodoChild } from "./controller/loadTodoChildController";
import { deleteTodoController, validateDeleteTodo } from "./controller/deleteTodoController";
import { updateTodoController, validateUpdateTodo } from "./controller/updateTodoController";


const router = Router();

//router.get('/loadTodo/:table', validateLoadTodo, loadTodoController); <-- USES OLD SQL QUERY NEEDS UPDATE

router.get('/loadTodo/:table', validateLoadTodo, loadTodoController); //POSSIBLE: Add a sort tag per item, to have the user be able to sort them themselves
router.post('/loadTodoChild', validateLoadTodoChild, loadTodoChildController); 

//Modifying Parent
router.delete('/deleteTodo/:todoId/:table/:depth?', validateDeleteTodo, deleteTodoController);
router.put('/updateTodo', validateUpdateTodo, updateTodoController);

//router.post('/createTodo')
//router.put('/unArchive')

export default router;
