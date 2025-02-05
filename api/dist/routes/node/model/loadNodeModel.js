"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadNodeModel = loadNodeModel;
const createServer_1 = require("../../../server/createServer");
async function loadNodeModel(depth, todoId) {
    try {
        //ARRAY[0]::numeric[]
        const depthString = "ARRAY[" + depth.join(",") + "]::numeric[]";
        const query = `SELECT tn.* FROM todo.node tn
                            JOIN todo.todo_children ttc ON tn.node_id = ANY(ttc.body)
                            WHERE ttc.depth = ${depthString} AND ttc.todo_id = $1
                            `;
        const params = [todoId];
        const dbRes = await createServer_1.dbServiceInstance.queryMethod(query, params);
        if (dbRes.length === 0) {
            return {
                message: "No Nodes found with given parameter: " + depth,
                status: 404
            };
        }
        else {
            return {
                checkFlag: true,
                dbRes
            };
        }
    }
    catch (error) {
        throw error;
    }
}
