"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getUserController_1 = require("./controller/getUserController");
const router = (0, express_1.Router)();
router.get('/user', getUserController_1.validateGetUser, getUserController_1.getUserController);
exports.default = router;
