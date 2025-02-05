import { Router } from "express";
import { createNodeController, validateCreateNode } from "./controller/createNodeController";
import { updateNodeController, validateUpdateNode } from "./controller/updateNodeController";
import { deleteNodeController, validateDeleteNode } from "./controller/deleteNodeController";
import { loadNodeController, validateLoadNode } from "./controller/loadNodeController";
//import { loadTodoTreeController, validateLoadTodoTree } from "./controller/loadTodoTreeController";

const router = Router();

//router.get('/loadTodo/:table', validateLoadTodo, loadTodoController); 
router.post('/createNode', validateCreateNode, createNodeController);
router.put('/updateNode/:nodeId', validateUpdateNode, updateNodeController);
router.delete('/deleteNode/:nodeId', validateDeleteNode, deleteNodeController);
router.post('/loadNode', validateLoadNode, loadNodeController);

export default router;
