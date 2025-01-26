"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTodoChildModel = loadTodoChildModel;
const createServer_1 = require("../../../server/createServer");
async function loadTodoChildModel(todoId, type, depth, tableInput, userId) {
    try {
        const queryTable = tableInput == "active" ? "todo_active" : tableInput == "archive" ? "todo_archive" : null;
        if (depth === undefined) {
            depth = [];
        }
        ;
        let query = `SELECT ttc.completed, ttc.title, ttc.body, ttc.depth  
                FROM todo.todo_children ttc
                JOIN todo.${queryTable} ttp ON ttp.todo_id = ttc.todo_id
                WHERE array_length("depth", 1) = $1 
                AND ttc.todo_id = $2 `;
        let length = depth.length > 0 ? depth.length + 1 : 1;
        let params = [length, todoId];
        if (type == "child") {
            const depthLength = depth.length;
            let depthParent = depth.pop() || 0;
            params.push(depthLength);
            params.push(depthParent);
            query += `AND "depth"[$3] = $4 `;
        }
        query += `AND user_id = ${userId};`;
        const dbRes = await createServer_1.dbServiceInstance.queryMethod(query, params);
        if (dbRes.length === 0) {
            return {
                status: 404,
                message: "No children found"
            };
        }
        return {
            checkFlag: true,
            dbRes: dbRes
        };
    }
    catch (error) {
        throw error;
    }
}
///loadTodoChild/:type/:depth/:table
