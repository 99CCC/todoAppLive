"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDbService = initializeDbService;
const dbService_1 = require("./dbService");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let dbServiceInstance = null;
async function initializeDbService() {
    if (!dbServiceInstance) {
        try {
            const dbUser = process.env.dbUser;
            const dbPassword = process.env.dbPassword;
            const dbHost = process.env.dbHost;
            const dbName = process.env.dbName;
            if (!dbUser || !dbPassword || !dbHost || !dbName) {
                throw new Error('Database variables missing or error reading env file');
            }
            dbServiceInstance = dbService_1.dbService.getInstance(dbUser, dbPassword, dbHost, dbName);
        }
        catch (error) {
            throw error;
        }
    }
    return dbServiceInstance;
}
