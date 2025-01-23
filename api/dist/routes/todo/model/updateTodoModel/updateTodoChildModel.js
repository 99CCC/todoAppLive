"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoChildModel = updateTodoChildModel;
const createServer_1 = require("../../../../server/createServer");
async function updateTodoChildModel(userId, todoId, depth, title, body, completed) {
    try {
        const stringifiedArray = "ARRAY[" + depth.join(",") + "]::NUMERIC[]";
        let params = [userId, todoId, stringifiedArray];
        let query = "UPDATE todo.todo_children SET";
        if (title) {
            query += ` title = ${"$" + params.length + 1},`;
            params.push(title);
        }
        if (completed !== undefined) {
            query += ` completed = ${"$" + params.length + 1}`;
            params.push(completed);
            if (body) {
                query += ",";
            }
        }
        if (body) {
            query += ` body = ${"$" + params.length + 1}`;
            params.push(body);
        }
        if (title === undefined && completed === undefined && body === undefined) {
            return {
                status: 400,
                message: "Invalid body passed: When typeof child field 'title' or 'completed' or 'body' is required"
            };
        }
        query += " WHERE user_id = $1 AND todo_id = $2 AND depth = $3";
        const dbRes = await createServer_1.dbServiceInstance.detailedQueryMethod(query, params);
        if (dbRes.rowCount == 0) {
            return {
                status: 404,
                message: "No todo child was found with given parameters"
            };
        }
        else {
            return {
                checkFlag: true,
                status: 200,
                message: dbRes
            };
        }
    }
    catch (error) {
        throw error;
    }
}
