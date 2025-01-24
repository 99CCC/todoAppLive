import { dbServiceInstance } from "../../../server/createServer";

export async function deleteTodoModel(userId: number, todoId: number, tableInput: string, depth?: number[]) {
    try {
        console.log("loggert", depth);
        if (depth) {
            const length = depth.length;
            const lastDigit = depth[length - 1];
            const stringifiedArray = "ARRAY["+depth.join(",")+"]::NUMERIC[]";
            let prefixGuard = "";
            let j = 1;
            for (let i = 0; i<depth.length; i++){
                prefixGuard += ` AND "depth"[${j}] = ${depth[i]}`;
                j++
            }; 

            const query = `WITH valid_todos AS (
                            SELECT todo_id FROM todo.todo_active WHERE user_id = $1 AND todo_id = $2
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
            const params = [userId, todoId, length, lastDigit]
                            //const params = [depth, todoId, userId, length, lastDigit];

            const dbRes = await dbServiceInstance.detailedQueryMethod(query, params);

            if (dbRes.rows.length == 0) {
                return {
                    status: 404,
                    message: "No items found nor deleted"
                };
            } else {
                return {
                    checkFlag: true,
                    status: 200,
                    message: {
                        ParentDeletedCount: 0,
                        ChildrenDeletedCount: dbRes.rows.length ?? 0,
                        details: dbRes
                    }
                }
            }
        }
        const queryTable = tableInput == "active" ? "todo_active" : tableInput == "archive" ? "todo_archive" : null;

        const query = `WITH valid_todos AS (
                            SELECT todo_id FROM todo.${queryTable} WHERE user_id = $1 AND todo_id = $2
                        ),
                        deleted_children AS (
                            DELETE FROM todo.todo_children
                            WHERE todo_id IN (SELECT todo_id FROM valid_todos)
                            RETURNING todo_id
                        )
                        DELETE FROM todo.${queryTable}
                        WHERE todo_id IN (SELECT todo_id from deleted_children);`;

        const params = [userId, todoId];

        const dbRes = await dbServiceInstance.detailedQueryMethod(query, params);

            const queryParent = `DELETE FROM todo.todo_active WHERE user_id = $1 AND todo_id = $2`;
            const dbResParent = await dbServiceInstance.detailedQueryMethod(queryParent, params);

            if (dbResParent.rowCount == 0 && dbRes.rowCount == 0) {
                return {
                    status: 404,
                    message: "No items found nor deleted"
                };
            } else {
                return {
                    checkFlag: true,
                    status: 200,
                    message: {
                        ParentDeletedCount: dbResParent.rowCount ?? 0,
                        ChildrenDeletedCount: dbRes.rowCount ?? 0
                    }
                }
            }
    } catch (error) {
        throw error;
    }
}