"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTodoModelTree = loadTodoModelTree;
const createServer_1 = require("../../../server/createServer");
async function loadTodoModelTree(userId, tableInput) {
    try {
        const queryTable = tableInput == "active" ? "todo_active" : tableInput == "archive" ? "todo_archive" : null;
        if (!queryTable)
            throw new Error("queryTable is null");
        const query = `SELECT json_agg(
                            json_build_object(
                                'title', parent.title,
                                'completed', parent.completed,
                                'children', parent.children
                            )
                        ) AS res
                        FROM (
                            SELECT 
                                ttp.title,
                                ttp.completed,
                                json_agg(
                                    json_build_object(
                                        'body', ttc.body,
                                        'depth', ttc.depth,
                                        'completed', ttc.completed
                                    )
                                ) AS children
                            FROM todo.${queryTable} ttp
                            LEFT JOIN todo.todo_children ttc ON ttc.todo_id = ttp.todo_id
                            WHERE ttp.user_id = $1
                            GROUP BY ttp.todo_id, ttp.title, ttp.completed
                        ) parent;
                        `;
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
