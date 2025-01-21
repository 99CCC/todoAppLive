"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbService = void 0;
const pg_1 = __importDefault(require("pg"));
class dbService {
    static instance;
    connectionPool;
    constructor(dbUser, dbPassword, dbHost, dbName) {
        this.connectionPool = new pg_1.default.Pool({
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
    static getInstance(dbUser, dbPassword, dbHost, dbName) {
        if (!dbService.instance) {
            dbService.instance = new dbService(dbUser, dbPassword, dbHost, dbName);
        }
        return dbService.instance;
    }
    async queryMethod(query, params = []) {
        try {
            const dbRes = await this.connectionPool.query(query, params);
            return dbRes.rows;
        }
        catch (error) {
            throw error;
        }
    }
    async detailedQueryMethod(query, params = []) {
        try {
            const dbRes = await this.connectionPool.query(query, params);
            return dbRes;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.dbService = dbService;
