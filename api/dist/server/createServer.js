"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbServiceInstance = void 0;
exports.createServer = createServer;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/*--- Middleware ---*/
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("../middleware/authMiddleware");
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
function createServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET || "SecreyKey",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    /*--- Healthcheck ---*/
    app.get('/healthcheck', async (_req, res, _next) => {
        res.status(200).send({ 'message': 'OK' });
    });
    importRoutes(app);
    app.use(function (req, res, next) {
        res.status(404).json({ message: "Route not found" });
    });
    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(err.status || 500).json({ message: "Internal Server Error", errorType: err.type, Error: err });
    });
    return app;
}
/**
 * Mounts all routes,
 * !: Order matters, once Middleware is mounted it will affect subsequent mounts
 */
function importRoutes(app) {
    /* --- Public Routes ---*/
    app.use(publicUserRoute_1.default);
    /* --- Private Routes ---*/
    app.use(authMiddleware_1.authMiddleware, privateUserRoute_1.default);
}
