import { dbServiceInstance } from "../../../server/createServer";
import bcrypt from 'bcrypt';

export async function loginModel(username: string, password: string){
    try {
        const query = `SELECT user_id, password FROM "user"."user" WHERE username = $1`;
        const params = [username];
        const dbRes = await dbServiceInstance.queryMethod(query, params);
        const validatedPassword = dbRes.length <= 0 ? null : dbRes[0].password;

        const isMatch = bcrypt.compareSync(password, validatedPassword);

        if(isMatch){
            return {
                checkFlag: true,
                userId: dbRes[0].user_id
            }
        }else{
            return {
                message: "Invalid user/password combination"
            }
        }


    } catch (error: any) {
        throw error;
    }
}