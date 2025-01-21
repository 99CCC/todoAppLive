import bcrypt from 'bcrypt';
import { dbServiceInstance } from '../../../server/createServer';

export async function createUserModel(username: string, password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO "user"."user" (username, "password") 
                    VALUES ($1, $2) ON CONFLICT("username")
                        DO NOTHING;`

        const params = [username, hashedPassword];

        const dbRes = await dbServiceInstance.detailedQueryMethod(query, params);
        const insert = dbRes.rowCount === 0 ? false : true;

        if (insert) {
            return {
                checkFlag: true,
                message: "User successfully created"
            }
        } else {
            return {
                message: "Invalid username"
            }
        }
    } catch (error: any) {
        throw error;
    }
}