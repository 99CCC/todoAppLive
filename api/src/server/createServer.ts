import express, { Express } from 'express';
import cors from 'cors';

/*--- Importing routes ---*/
import privateUserRoute from "../routes/user/privateUserRoute";
import publicUserRoute from "../routes/user/publicUserRoute";
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

export async function createServer(): Promise<Express> {
    const app: Express = express();
    app.use(express.json());
    app.use(cors({origin: "http://localhost:3000", credentials: true}));

    await importRoutes(app);

    /*--- Public Endpoints ---*/
    app.get('/healthcheck', async (_req, res, _next) => {
        res.status(200).send({'message':'OK'});
    });

    return app;

}

async function importRoutes(app: Express): Promise<void>{
    app.use(privateUserRoute);
    app.use(publicUserRoute);
}