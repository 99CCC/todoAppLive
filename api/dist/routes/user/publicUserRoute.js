"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("./controller/loginController");
const createUserController_1 = require("./controller/createUserController");
const router = (0, express_1.Router)();
/*--- Public ---*/
router.post('/create/user', createUserController_1.validateCreateUser, createUserController_1.createUserController);
router.post('/login', loginController_1.validateLogin, loginController_1.loginController);
exports.default = router;
