import { Router } from "express";
import { getUserController, validateGetUser } from "./controller/getUserController";

const router = Router();

router.get('/user', validateGetUser, getUserController);

export default router;
