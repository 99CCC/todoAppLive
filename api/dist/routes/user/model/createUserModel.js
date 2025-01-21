"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserModel = createUserModel;
const bcrypt_1 = __importDefault(require("bcrypt"));
const createServer_1 = require("../../../server/createServer");
async function createUserModel(username, password) {
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const query = `INSERT INTO "user"."user" (username, "password") 
                    VALUES ($1, $2) ON CONFLICT("username")
                        DO NOTHING;`;
        const params = [username, hashedPassword];
        const dbRes = await createServer_1.dbServiceInstance.detailedQueryMethod(query, params);
        const insert = dbRes.rowCount === 0 ? false : true;
        if (insert) {
            return {
                checkFlag: true,
                message: "User successfully created"
            };
        }
        else {
            return {
                message: "Invalid username"
            };
        }
    }
    catch (error) {
        throw error;
    }
}
