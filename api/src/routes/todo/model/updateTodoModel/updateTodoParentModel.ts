import { dbServiceInstance } from "../../../../server/createServer";

export async function updateTodoParentModel(
    userId: number, todoId: number,
    title?: string,
    completed?: boolean) {
    try {
        let query = "UPDATE todo.todo_active SET"
        let params: any[] = [userId, todoId];
        
        if(title){
            const pLength = params.length+1
            query += ` title = ${"$"+pLength},`;
            params.push(title);
        }

        if(completed !== undefined){
            const pLength = params.length+1
            query += ` completed = ${"$"+pLength}`;
            params.push(completed);
        }else{
            query = query.substring(0, query.length-1);
        }

        if(title === undefined && completed === undefined){
            return{
                status: 400,
                message: "Invalid body passed: When typeof parent field 'completed' or 'title' is required"
            }
        }

        query += " WHERE user_id = $1 AND todo_id = $2";
        
        const dbRes = await dbServiceInstance.detailedQueryMethod(query, params);

        if(dbRes.rowCount == 0){
            return{
                status: 404,
                message: "No todo item was found with given parameters"
            }
        }else{
            return{
                checkFlag: true,
                status: 200,
                message: dbRes.rowCount
            }
        }
    } catch (error) {
        throw error;
    }
}

