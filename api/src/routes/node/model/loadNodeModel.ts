import { dbServiceInstance } from "../../../server/createServer";

export async function loadNodeModel(depth: number[], todoId: number){
    try {
            //ARRAY[0]::numeric[]
            const depthString = "ARRAY["+depth.join(",")+"]::numeric[]";

            const query = `SELECT tn.* FROM todo.node tn
                            JOIN todo.todo_children ttc ON tn.node_id = ANY(ttc.body)
                            WHERE ttc.depth = ${depthString} AND ttc.todo_id = $1
                            `;
            const params = [todoId];

            const dbRes = await dbServiceInstance.queryMethod(query, params);

            if(dbRes.length === 0){
                return{
                    message: "No Nodes found with given parameter: "+depth,
                    status: 404
                }
            }else{
                return{
                    checkFlag: true,
                    dbRes
                }
            }


    } catch (error) {
        throw error;
    }
}