import { dbServiceInstance } from "../../../server/createServer";

export async function restoreTodoModel(userId: number, todoId: number){
    try {
        //if we want to return the moved todo then just add a WITH select * from todo.todo_active where todo_id = $1
        const query = `UPDATE todo.todo_archive SET completed = false WHERE todo_id = $1 AND user_id = $2 RETURNING *`;
        const params: any[] = [todoId, userId];

        const dbRes = await dbServiceInstance.queryMethod(query, params);

        if(dbRes.length == 0){
            return{
                status: 404,
                message: "No rows affected/found"
            }
        }else{
            return{
                checkFlag: true,
                status: 200,
                message: "Todo Restored",
                data: dbRes
            }
        }
        
    } catch (error) {
        throw error;
    }
}