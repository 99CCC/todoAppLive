import { dbServiceInstance } from "../../../server/createServer";

export async function loadTodoModel(userId: number, queryTable: string){
    try {


        const query = `SELECT * FROM todo.${queryTable} tp 
                        JOIN todo_children tc ON tc.todo_id = tp.todo_id 
                            WHERE user_id = $1;`
        const params = [userId];

        const dbRes = await dbServiceInstance.queryMethod(query, params);

        if(dbRes.length === 0){
            return{
                message: "No todo items found"
            }
        }

    } catch (error) {
        throw error;
    }
}