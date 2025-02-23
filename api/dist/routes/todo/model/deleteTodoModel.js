"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoModel = deleteTodoModel;
const createServer_1 = require("../../../server/createServer");
async function deleteTodoModel(userId, todoId, tableInput, depth) {
    try {
        console.log("loggert", depth);
        if (depth) {
            const length = depth.length; //1
            const lastDigit = depth[length - 1]; //4
            const stringifiedArray = "ARRAY[" + depth.join(",") + "]::NUMERIC[]";
            let prefixGuard = "";
            let nodeCollector = [];
            let j = 1;
            for (let i = 0; i < depth.length; i++) {
                prefixGuard += ` AND "depth"[${j}] = ${depth[i]}`;
                nodeCollector.push(depth[i]);
                j++;
            }
            ;
            const query = `WITH valid_todos AS (
                            SELECT todo_id FROM todo.todo_active WHERE user_id = $1 AND todo_id = $2
                            ),
                            off_bodies AS (
                                DELETE FROM todo.node
                                WHERE node_id IN (${nodeCollector.join(', ')})
                            ),
                            off_children AS (
                                DELETE FROM todo.todo_children
                                WHERE "depth"[$3] = $4 AND todo_id IN (SELECT todo_id FROM valid_todos)
                                AND cardinality("depth")  > $3
                                ${prefixGuard}
                                RETURNING *
                            )  
                            DELETE FROM todo.todo_children
                            WHERE "depth" = ${stringifiedArray} AND todo_id IN (SELECT todo_id FROM valid_todos)
                            RETURNING *;`;
            const params = [userId, todoId, length, lastDigit];
            //const params = [depth, todoId, userId, length, lastDigit];
            const dbRes = await createServer_1.dbServiceInstance.detailedQueryMethod(query, params);
            if (dbRes.rows.length == 0) {
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
                        ParentDeletedCount: 0,
                        ChildrenDeletedCount: dbRes.rows.length ?? 0,
                        details: dbRes
                    }
                };
            }
        }
        const queryTable = tableInput == "active" ? "todo_active" : tableInput == "archive" ? "todo_archive" : null;
        const query = `WITH valid_todos AS (
                            SELECT todo_id FROM todo.${queryTable} WHERE user_id = $1 AND todo_id = $2
                        ),
                        body_selector AS (
                            SELECT body FROM todo.todo_children WHERE todo_id IN (SELECT todo_id FROM valid_todos)
                        ),
                            off_bodies AS (
                                DELETE FROM todo.node
								WHERE node_id IN (SELECT unnest(body) FROM body_selector)
                            ),                        
                        deleted_children AS (
                            DELETE FROM todo.todo_children
                            WHERE todo_id IN (SELECT todo_id FROM valid_todos)
                            RETURNING todo_id
                        )
                        DELETE FROM todo.${queryTable}
                        WHERE todo_id IN (SELECT todo_id from deleted_children);`;
        const params = [userId, todoId];
        const dbRes = await createServer_1.dbServiceInstance.detailedQueryMethod(query, params);
        const queryParent = `DELETE FROM todo.todo_active WHERE user_id = $1 AND todo_id = $2`;
        const dbResParent = await createServer_1.dbServiceInstance.detailedQueryMethod(queryParent, params);
        if (dbResParent.rowCount == 0 && dbRes.rowCount == 0) {
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
    catch (error) {
        throw error;
    }
}
