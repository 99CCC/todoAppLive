"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginModel = loginModel;
const createServer_1 = require("../../../server/createServer");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function loginModel(username, password) {
    try {
        const query = `SELECT user_id, password FROM "user"."user" WHERE username = $1`;
        const params = [username];
        const dbRes = await createServer_1.dbServiceInstance.queryMethod(query, params);
        const validatedPassword = dbRes.length <= 0 ? null : dbRes[0].password;
        const isMatch = bcrypt_1.default.compareSync(password, validatedPassword);
        if (isMatch) {
            return {
                checkFlag: true,
                userId: dbRes[0].user_id
            };
        }
        else {
            return {
                message: "Invalid user/password combination"
            };
        }
    }
    catch (error) {
        throw error;
    }
}
