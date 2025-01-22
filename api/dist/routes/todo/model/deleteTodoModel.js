"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoModel = deleteTodoModel;
const createServer_1 = require("../../../server/createServer");
async function deleteTodoModel(userId, todoId, tableInput) {
    try {
        const queryTable = tableInput == "active" ? "todo_active" : tableInput == "archive" ? "todo_archive" : null;
        const query = `WITH valid_todos AS (
                            SELECT todo_id FROM todo.todo_active WHERE user_id = $1 AND todo_id = $2
                        ),
                        deleted_children AS (
                            DELETE FROM todo.todo_children
                            WHERE todo_id IN (SELECT todo_id FROM valid_todos)
                            RETURNING todo_id
                        )
                        DELETE FROM todo.todo_active
                        WHERE todo_id IN (SELECT todo_id from deleted_children);`;
        const params = [userId, todoId];
        const dbRes = await createServer_1.dbServiceInstance.detailedQueryMethod(query, params);
        if (dbRes.rowCount == 0) {
            const queryParent = `DELETE FROM todo.todo_active WHERE user_id = $1 AND todo_id = $2`;
            const dbResParent = await createServer_1.dbServiceInstance.detailedQueryMethod(queryParent, params);
            if (dbResParent.rowCount == 0) {
                return {
                    status: 404,
                    message: "No items found nor deleted"
                };
            }
            else {
                return {
                    checkFlag: true,
                    status: 200,
                    message: {
                        ParentDeletedCount: dbResParent.rowCount ?? 0,
                        ChildrenDeletedCount: dbRes.rowCount ?? 0
                    }
                };
            }
        }
        else {
            throw new Error("No resolution from deleteTodoModel");
        }
    }
    catch (error) {
        throw error;
    }
}
