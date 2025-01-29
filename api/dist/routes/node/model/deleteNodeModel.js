"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNodeModel = deleteNodeModel;
const createServer_1 = require("../../../server/createServer");
async function deleteNodeModel(nodeId) {
    try {
        const query = `DELETE FROM todo.node WHERE node_id = $1 RETURNING node_id`;
        const params = [nodeId];
        const dbRes = await createServer_1.dbServiceInstance.queryMethod(query, params);
        if (dbRes.length == 0) {
            return {
                status: 404,
                message: "No affected rows in database"
            };
        }
        return {
            checkFlag: true,
            status: 200,
            message: "OK"
        };
    }
    catch (error) {
        throw error;
    }
}
