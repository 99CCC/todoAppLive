import { dbServiceInstance } from "../../../../server/createServer";

export async function updateTodoChildModel(
    userId: number,     todoId: number,
    depth: number[],    title?: string, 
    body?: string,      completed?: boolean) {
    try {
        const stringifiedArray = "ARRAY["+depth.join(",")+"]::NUMERIC[]";
        let params: any[] = [userId, todoId];

        let query = `
        WITH valid_todo AS (
            SELECT todo_id FROM todo.todo_active WHERE todo_id = $2 AND user_id = $1 
        )
        UPDATE todo.todo_children SET`

        if(title){
            const pLength = params.length+1
            query += ` title = ${"$"+pLength}`;
            if(completed !== undefined || body !== undefined){
                query += ","
            }
            params.push(title);
        }

        if(completed !== undefined){
            const pLength = params.length+1
            query += ` completed = ${"$"+pLength}`;
            params.push(completed);
            if(body){
                query += ",";
            }
        }

        if(body){
            const pLength = params.length+1
            query += ` body = ${"$"+pLength}`;
            params.push(body);
        }

        if(title === undefined && completed === undefined && body === undefined){
            return{
                status: 400,
                message: "Invalid body passed: When typeof child field 'title' or 'completed' or 'body' is required"
            }
        }

        query += ` WHERE todo_id IN (SELECT todo_id FROM valid_todo) AND depth = ${stringifiedArray}`;
        
        const dbRes = await dbServiceInstance.detailedQueryMethod(query, params);

        if(dbRes.rowCount == 0){
            return{
                status: 404,
                message: "No todo child was found with given parameters"
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

