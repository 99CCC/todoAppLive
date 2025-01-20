import { dbService } from "./dbService";
import * as dotenv from 'dotenv';
dotenv.config();

let dbServiceInstance: dbService | null = null;

export async function initializeDbService(): Promise<dbService>{
    if(!dbServiceInstance){
        try {
            const dbUser = process.env.dbUser;
            const dbPassword = process.env.dbPassword;
            const dbHost = process.env.dbHost;
            const dbName = process.env.dbName;

            if (!dbUser || !dbPassword || !dbHost || !dbName ){
                throw new Error('Database variables missing or error reading env file');
            }

            dbServiceInstance = dbService.getInstance(dbUser, dbPassword, dbHost, dbName );

        } catch (error: any) {
            throw error;
        }
    }
    return dbServiceInstance;
}