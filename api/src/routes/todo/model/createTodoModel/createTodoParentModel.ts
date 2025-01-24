import { dbServiceInstance } from "../../../../server/createServer";

export async function createTodoParentModel(userId: number, title?: string,  ){
    try {
        let query = "";
        let params: any[] = [userId]

        if(title){
        query = `INSERT INTO todo.todo_active (user_id, title) VALUES ($1, $2) RETURNING *`;
        params.push(title);
    }else{
        query = `INSERT INTO todo.todo_active (user_id) VALUES ($1) RETURNING *`;
    }

    const dbRes = await dbServiceInstance.queryMethod(query, params);

    if(dbRes.length == 0){
        return{
            status: 500,
            message: "DB insertion did not complete"
        }
    }

    return{
        checkFlag: true,
        status: 200,
        data: dbRes[0]
    }

    } catch (error) {
        throw error;
    }
}