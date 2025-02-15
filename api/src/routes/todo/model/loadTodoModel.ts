import { dbServiceInstance } from "../../../server/createServer";

export async function loadTodoModel(tableInput: string, userId: number){
    try {
        const queryTable = tableInput == "active" ? "todo_active" : tableInput == "archive" ? "todo_archive" : null;

        const query = `SELECT todo_id, title, completed FROM todo.${queryTable} WHERE user_id = $1 ORDER BY todo_id`;
        console.log(query);
        const params = [userId];

        const dbRes = await dbServiceInstance.queryMethod(query, params);

        if (dbRes.length === 0) {
            return {
                message: "No todo items found",
                status: 404
            }
        }else{
            return {
                checkFlag: true,
                data: dbRes
            }
        }

    } catch (error) {
        throw error;
    }
}