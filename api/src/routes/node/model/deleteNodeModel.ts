import { dbServiceInstance } from "../../../server/createServer";


export async function deleteNodeModel(nodeId: number){
    try {
        const query = `DELETE FROM todo.node WHERE node_id = $1 RETURNING node_id`;
        const params = [nodeId];
        
        const dbRes = await dbServiceInstance.queryMethod(query, params);
        
        if(dbRes.length == 0){
            return{
                status: 404,
                message: "No affected rows in database"
            }
        }

        return{
            checkFlag: true,
            status: 200,
            message: "OK"
        }


    } catch (error) {
        throw error;
    }
}