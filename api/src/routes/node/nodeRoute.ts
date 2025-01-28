import { Router } from "express";
import { createNodeController, validateCreateNode } from "./controller/createNodeController";
//import { loadTodoTreeController, validateLoadTodoTree } from "./controller/loadTodoTreeController";



const router = Router();

//router.get('/loadTodo/:table', validateLoadTodo, loadTodoController); 
router.post('/createNode', validateCreateNode, createNodeController);


export default router;
