"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbServiceInstance = void 0;
exports.createServer = createServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
/*--- Importing routes ---*/
const privateUserRoute_1 = __importDefault(require("../routes/user/privateUserRoute"));
const publicUserRoute_1 = __importDefault(require("../routes/user/publicUserRoute"));
const dbServiceinitializer_1 = require("../services/dbServiceinitializer");
let dbServiceInstance;
(0, dbServiceinitializer_1.initializeDbService)()
    .then((instance) => {
    exports.dbServiceInstance = dbServiceInstance = instance;
    console.log("Database service initialized");
})
    .catch((error) => {
    console.error("Failed to initialize Database Service. Error: ", error);
    process.exit(1);
});
async function createServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
    await importRoutes(app);
    /*--- Public Endpoints ---*/
    app.get('/healthcheck', async (_req, res, _next) => {
        res.status(200).send({ 'message': 'OK' });
    });
    return app;
}
async function importRoutes(app) {
    app.use(privateUserRoute_1.default);
    app.use(publicUserRoute_1.default);
}
