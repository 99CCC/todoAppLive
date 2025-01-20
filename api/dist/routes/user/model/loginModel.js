"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginModel = loginModel;
const createServer_1 = require("../../../server/createServer");
async function loginModel(username, password) {
    try {
        const query = `SELECT user_id, password FROM "user"."user" WHERE username = $1`;
        const params = [username];
        const dbRes = await createServer_1.dbServiceInstance.queryMethod(query, params);
        const validatedPassword = dbRes.length <= 0 ? null : dbRes[0].password;
        console.log("dbRes: ", dbRes, '\n', "dbResLength: ", dbRes.length, '\n', "Password from user: ", password, '\n', "Password from DB: ", dbRes[0].password);
        if (validatedPassword == password) {
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
