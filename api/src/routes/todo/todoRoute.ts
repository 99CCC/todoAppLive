import { Router } from "express";
import { loadTodoController, validateLoadTodo } from "./controller/loadTodoController";


const router = Router();

router.get('/loadTodo/:table', validateLoadTodo, loadTodoController);
//router.get('/loadTodoById) possible additions if we want to save space on FE
//router.get('/loadTodoChild)

export default router;
