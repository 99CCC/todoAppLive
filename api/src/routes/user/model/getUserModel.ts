import { dbServiceInstance } from "../../../server/createServer";

export async function getUserModel(username: string){
    try {
        const query = `SELECT * FROM "user"."user" WHERE username = $1`;
        const params = [username];
        const dbRes = await dbServiceInstance.queryMethod(query, params);

        if(dbRes.length === 0){
            return{
                message: "No user found"
            }
        }else{
            return{
                checkFlag: true,
                data: dbRes
            }
        }

    } catch (error) {
        return{
            message: "Internal Server Error"
        }
    }
}