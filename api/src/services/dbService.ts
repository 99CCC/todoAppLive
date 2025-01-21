import pkg from 'pg';

export class dbService {
    private static instance: dbService;
    private connectionPool: pkg.Pool;

    private constructor(dbUser: string, dbPassword: string, dbHost: string, dbName: string){
        this.connectionPool = new pkg.Pool({
            user: dbUser,
            host: dbHost,
            database: dbName,
            password: dbPassword,
            port: 5432,
            max: 10,
            ssl: false,
            idleTimeoutMillis: 60000
        });
    }

    public static getInstance(dbUser: string, dbPassword: string, dbHost: string, dbName: string): dbService{
        if(!dbService.instance){
            dbService.instance = new dbService(dbUser,dbPassword, dbHost, dbName);
        }
        return dbService.instance;
    }

    public async queryMethod(query: string, params: any[] = []): Promise<any[]>{
        try{
        const dbRes = await this.connectionPool.query(query, params);
        return dbRes.rows;
    }catch(error: any){
        throw error;
    }}

    public async detailedQueryMethod(query: string, params: any[] = []): Promise<pkg.QueryResult<any>>{
        try{
        const dbRes = await this.connectionPool.query(query, params);
        return dbRes;
    }catch(error: any){
        throw error;
    }}

}