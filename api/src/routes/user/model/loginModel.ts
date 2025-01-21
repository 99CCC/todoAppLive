import { dbServiceInstance } from "../../../server/createServer";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export async function loginModel(username: string, password: string){
    try {
        const query = `SELECT user_id, password FROM "user"."user" WHERE username = $1`;
        const params = [username];
        const dbRes = await dbServiceInstance.queryMethod(query, params);
        const validatedPassword = dbRes.length <= 0 ? null : dbRes[0].password;

        const isMatch = bcrypt.compareSync(password, validatedPassword);

        if(isMatch){
            const token = jwt.sign(
                {userId: dbRes[0].user_id}, 
                process.env.JWT_SECRET as string, 
                {expiresIn: '1 Days'}
            );
            return {
                checkFlag: true,
                token: token
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