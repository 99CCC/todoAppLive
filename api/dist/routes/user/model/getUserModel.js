"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModel = getUserModel;
const createServer_1 = require("../../../server/createServer");
async function getUserModel(username) {
    try {
        const query = `SELECT * FROM "user"."user" WHERE username = $1`;
        const params = [username];
        const dbRes = await createServer_1.dbServiceInstance.queryMethod(query, params);
        if (dbRes.length === 0) {
            return {
                message: "No user found"
            };
        }
        else {
            return {
                checkFlag: true,
                data: dbRes
            };
        }
    }
    catch (error) {
        return {
            message: "Internal Server Error"
        };
    }
}
