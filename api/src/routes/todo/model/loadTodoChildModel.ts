import { dbServiceInstance } from "../../../server/createServer";

export async function loadTodoChildModel(todoId: number, type: string, depth: number[], tableInput: string, userId: number) {
    try {
        const queryTable = tableInput == "active" ? "todo_active" : tableInput == "archive" ? "todo_archive" : null;

        if (depth === undefined) { depth = [] };

        let query = `SELECT ttp.todo_id, ttc.completed AS child_completed, ttc.title AS child_title, ttc.depth AS child_depth, tn.*   
                FROM todo.todo_children ttc
                JOIN todo.${queryTable} ttp ON ttp.todo_id = ttc.todo_id
                LEFT JOIN todo.node tn ON tn.node_id = ANY(ttc.body)
                WHERE array_length(ttc."depth", 1) = $1 
                AND ttc.todo_id = $2 `;

        let length = depth.length > 0 ? depth.length + 1 : 1;
        let params = [length, todoId];

        if (type == "child") {
            const depthLength = depth.length;
            let depthParent = depth.pop() || 0;
            params.push(depthLength)
            params.push(depthParent);

            query += `AND "depth"[$3] = $4 `;
        }

        query += `AND user_id = ${userId};`; //need to find to order it by depth or we solve it down in the map

        const dbRes = await dbServiceInstance.queryMethod(query, params);

        if (dbRes.length === 0) {
            return {
                status: 404,
                message: "No children found"
            }
        }

        //polyfill
        Object.groupBy ??= function groupBy (iterable, callbackfn) {
            const obj = Object.create(null)
            let i = 0
            for (const value of iterable) {
              const key = callbackfn(value, i++)
              key in obj ? obj[key].push(value) : (obj[key] = [value])
            }
            return obj
          }          

        let groupedRes = Object.groupBy(dbRes, item => item.child_depth);
        if (!groupedRes) throw new Error("Shit just hit the fan");


        const mappedRes = Object.entries(groupedRes).map(([a, b]) => ({
            todo_id: b![0].todo_id,
            child_completed: b![0].child_completed,
            child_title: b![0].child_title,
            child_depth: b![0].child_depth,

            node: b?.map(c => ({
                node_id: c.node_id,
                completed: c.completed,
                body: c.body
            }))
        }));



        return {
            checkFlag: true,
            dbRes: mappedRes
        }

    } catch (error) {
        throw error;
    }
}

///loadTodoChild/:type/:depth/:table