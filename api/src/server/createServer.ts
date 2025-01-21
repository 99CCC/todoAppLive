import express, { Express } from 'express';
import session from 'express-session';
import dotenv from "dotenv";
dotenv.config();

/*--- Middleware ---*/
import cors from 'cors';
import { authMiddleware } from '../middleware/authMiddleware';

/*--- Importing routes ---*/
import privateUserRoute from "../routes/user/privateUserRoute";
import publicUserRoute from "../routes/user/publicUserRoute";
import todoRoute from "../routes/todo/todoRoute";

/*--- Service Imports ---*/
import { dbService } from '../services/dbService';
import { initializeDbService } from '../services/dbServiceinitializer';

let dbServiceInstance: dbService;
initializeDbService()
    .then((instance) => {
        dbServiceInstance = instance;
        console.log("Database service initialized");
    })
    .catch((error) => {
        console.error("Failed to initialize Database Service. Error: ", error);
        process.exit(1);
    });
export { dbServiceInstance };

export function createServer(): Express {
    const app: Express = express();
    app.use(express.json());
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    app.use(
        session({
            secret: process.env.SESSION_SECRET || "SecreyKey",
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        })
    )

    /*--- Healthcheck ---*/
    app.get('/healthcheck', async (_req, res, _next) => {
        res.status(200).send({ 'message': 'OK' });
    });

    importRoutes(app);

    app.use(function (req: express.Request, res: express.Response, next) {
        res.status(404).json({message: "Route not found"});
    });

    app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500).json({message: "Internal Server Error", errorType: err.type});
    });
    return app;

}

/**
 * Mounts all routes,
 * !: Order matters, once Middleware is mounted it will affect subsequent mounts
 */
function importRoutes(app: Express) {
    /* --- Public Routes ---*/
    app.use(publicUserRoute);

    /* --- Start Usage of Authentication --- */
    app.use(authMiddleware);

    /* --- Private Routes ---*/
    app.use(privateUserRoute);
    app.use(todoRoute)
}