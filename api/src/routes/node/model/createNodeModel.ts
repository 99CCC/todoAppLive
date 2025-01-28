import { dbServiceInstance } from "../../../server/createServer";

export async function createNodeModel(depth: number[]){
    try {

        const stringifiedArray = "ARRAY["+depth.join(",")+"]::NUMERIC[]";
        
        const query = `WITH node_insertion AS (
                            INSERT INTO todo.node (body) 
                            VALUES ('') 
                            RETURNING node_id
                        )
                        UPDATE todo.todo_children
                        SET body = array_append(body, (SELECT node_id FROM node_insertion))
                        WHERE depth = ${stringifiedArray}
                        RETURNING (SELECT node_id FROM node_insertion);
                        `;
        const dbRes = await dbServiceInstance.queryMethod(query);

        if(dbRes.length == 0){
            return{
                status: 500,
                message: "Error during insertion of node"
            }
        }

        return{
            checkFlag: true,
            status: 200,
            message: "Ok",
            data: dbRes
        }


    } catch (error) {
        throw error;
    }
}