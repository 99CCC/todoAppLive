import { dbServiceInstance } from "../../../../server/createServer";
/**
 * NEEDS A REFACTOR TO USE MAP (GOAL: LESS THAN 60 LINES)
 * @param userId 
 * @param todoId 
 * @param depth 
 * @param title 
 * @param body 
 * @param completed 
 * @returns 
 */
export async function createTodoChildModel(
    userId: number, todoId: number,
    depth: number[], title?: string,
    body?: string, completed?: boolean) {
    try {
        if (depth !== undefined) {

            const length = depth.length | 0;
            let prefixGuard = "";
            let j = 1;
            for (let i = 0; i < length; i++) {
                prefixGuard += ` AND "depth"[${j}] = ${depth[i]}`;
                j++
            };

            const childQuery = `
                    WITH valid_todo AS (
            SELECT todo_id FROM todo.todo_active WHERE todo_id = $1 AND user_id = $2
                    )
                        SELECT * FROM todo.todo_children
                            WHERE 
                            todo_id IN (SELECT todo_id FROM valid_todo)
                                AND cardinality("depth")  > $3
									AND cardinality("depth") < $4
                                            ${prefixGuard}
            `;
            const suffixSafeguard = (depth.length | 0) + 2;
            const childParams = [todoId, userId, length, suffixSafeguard]

            const childRes = await dbServiceInstance.queryMethod(childQuery, childParams);
            console.log("childRes: ", childRes, "\n", "childRes length: ", + childRes.length);
            let insertQuery = "INSERT INTO todo.todo_children (todo_id, depth";
            let insertValues = " VALUES ($1, $2";
            let insertParams: any[] = [todoId];
            if (childRes.length == 0) {
                depth.push(1);
                insertParams.push(depth);
            } else {
                let conflictChildLength: number = (depth.length | 0);
                let lastDigitOfChild: number = 0;
                console.log("please work: ", childRes[0].depth, " is it this?: ", conflictChildLength);
                for(let i = 0; i < childRes.length; i++){
                    const check = childRes[i].depth[conflictChildLength];
                    console.log("huh", childRes[i].depth);
                    lastDigitOfChild = lastDigitOfChild < check ? check : lastDigitOfChild;
                    console.log("check: ", check);
                }
                depth.push(lastDigitOfChild+1);
                insertParams.push(depth);
            }

            if (title) {
                insertQuery += `, title`;
                insertParams.push(title);
                insertValues += `, $${insertParams.length}`

            }

            if (body) {
                insertQuery += `, body`;
                insertParams.push(body);
                insertValues += `, $${insertParams.length}`
            }

            if (completed !== undefined) {
                insertQuery += `, completed`;
                insertParams.push(completed);
                insertValues += `, $${insertParams.length}`;
            }

            insertQuery += (")" + insertValues + ") RETURNING *;");
            const dbInsertRes = await dbServiceInstance.queryMethod(insertQuery, insertParams);

            if (dbInsertRes.length == 0) {
                return {
                    status: 400,
                    message: "No child was created"
                }
            } else {
                return {
                    checkFlag: true,
                    status: 200,
                    message: "child created",
                    data: dbInsertRes[0]
                }
            }
        } else {
            const checkFirstChildrenQuery = 'SELECT * FROM todo.todo_children WHERE cardinality("depth")  = 1 AND todo_id = $1';
            const checkFirstChildrenParams = [todoId];
            const checkFirstChildrenRes = await dbServiceInstance.queryMethod(checkFirstChildrenQuery, checkFirstChildrenParams);
            let newDepth = [0];
            if (checkFirstChildrenRes.length > 0) {
                let newDepthValue = 0;
                for (const row of checkFirstChildrenRes) {
                    newDepthValue = newDepthValue < row.depth[0] ? row.depth[0] : newDepthValue;
                }
                newDepth = [newDepthValue+1];
            }

            let insertQuery = "INSERT INTO todo.todo_children (todo_id, depth";
            let insertValues = " VALUES ($1, $2";

            let insertParams: any[] = [todoId, newDepth];
            if (title) {
                insertQuery += `, title`;
                insertParams.push(title);
                insertValues += `, $${insertParams.length}`
            }

            if (body) {
                insertQuery += `, body`;
                insertParams.push(body);
                insertValues += `, $${insertParams.length}`
            }

            if (completed !== undefined) {
                insertQuery += `, completed`;
                insertParams.push(completed);
                insertValues += `, $${insertParams.length}`;
            }

            insertQuery += (")" + insertValues + ") RETURNING *;");
            const dbInsertRes = await dbServiceInstance.queryMethod(insertQuery, insertParams);
            if (dbInsertRes.length == 0) {
                return {
                    status: 400,
                    message: "No child was created"
                }
            } else {
                return {
                    checkFlag: true,
                    status: 200,
                    message: "child created",
                    data: dbInsertRes[0]
                }
            }
        }

    } catch (error) {
        throw error;
    }

}