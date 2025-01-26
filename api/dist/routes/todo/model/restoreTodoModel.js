"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreTodoModel = restoreTodoModel;
const createServer_1 = require("../../../server/createServer");
async function restoreTodoModel(userId, todoId) {
    try {
        //if we want to return the moved todo then just add a WITH select * from todo.todo_active where todo_id = $1
        const query = `UPDATE todo.todo_archive SET completed = false WHERE todo_id = $1 AND user_id = $2 RETURNING *`;
        const params = [todoId, userId];
        const dbRes = await createServer_1.dbServiceInstance.queryMethod(query, params);
        if (dbRes.length == 0) {
            return {
                status: 404,
                message: "No rows affected/found"
            };
        }
        else {
            return {
                checkFlag: true,
                status: 200,
                message: "Todo Restored",
                data: dbRes
            };
        }
    }
    catch (error) {
        throw error;
    }
}
