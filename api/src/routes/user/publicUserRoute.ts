import { Router } from "express";
import { loginController, validateLogin } from "./controller/loginController";
import { createUserController, validateCreateUser } from "./controller/createUserController";

const router = Router();

/*--- Public ---*/
router.post('/create/user', validateCreateUser, createUserController);
router.post('/login', validateLogin, loginController)


export default router;
