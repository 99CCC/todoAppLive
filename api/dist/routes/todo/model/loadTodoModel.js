"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTodoModel = loadTodoModel;
const createServer_1 = require("../../../server/createServer");
async function loadTodoModel(tableInput, userId) {
    try {
        const queryTable = tableInput == "active" ? "todo_active" : tableInput == "archive" ? "todo_archive" : null;
        const query = `SELECT todo_id, title FROM todo.${queryTable} WHERE user_id = $1`;
        console.log(query);
        const params = [userId];
        const dbRes = await createServer_1.dbServiceInstance.queryMethod(query, params);
        if (dbRes.length === 0) {
            return {
                message: "No todo items found",
                status: 404
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
        throw error;
    }
}
