import { dbServiceInstance } from "../../../server/createServer";

interface nodeUpdateInput {
    body?: string,
    completed?: boolean
}
//OBS! Add in validatoin to check that the node must be owned by the user making the request

export async function updateNodeModel(input: nodeUpdateInput, nodeId: number){
    try {
        
        let values = [];

        for (let prop of Object.keys(input) as (keyof nodeUpdateInput)[]){
            if(input.hasOwnProperty(prop)){
                values.push(prop + " = " + "'"+input[prop]+"'");
                }
        }

        const updateSet = values.join();

        const query = `UPDATE todo.node SET ${updateSet} WHERE node_id = $1 RETURNING *;`;
        const params = [nodeId];

        const dbRes = await dbServiceInstance.queryMethod(query, params);

        if(dbRes.length == 0 ){
            return{
                status: 500,
                message: "Model unresolved error on update todo.node"
            }
        };

        return{
            checkFlag: true,
            status: 200,
            message: "ok",
            data: dbRes
        }

    } catch (error) {
        throw error;
    }
}