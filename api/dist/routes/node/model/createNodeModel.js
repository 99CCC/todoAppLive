"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodeModel = createNodeModel;
const createServer_1 = require("../../../server/createServer");
async function createNodeModel(depth, todoId) {
    try {
        const stringifiedArray = "ARRAY[" + depth.join(",") + "]::NUMERIC[]";
        const query = `WITH node_insertion AS (
                            INSERT INTO todo.node (body) 
                            VALUES ('New Node') 
                            RETURNING node_id
                        )
                        UPDATE todo.todo_children
                        SET body = array_append(body, (SELECT node_id FROM node_insertion))
                        WHERE depth = ${stringifiedArray} AND todo_id = $1
                        RETURNING (SELECT node_id FROM node_insertion);
                        `;
        const params = [todoId];
        const dbRes = await createServer_1.dbServiceInstance.queryMethod(query, params);
        if (dbRes.length == 0) {
            return {
                status: 500,
                message: "Error during insertion of node"
            };
        }
        return {
            checkFlag: true,
            status: 200,
            message: "Ok",
            data: dbRes
        };
    }
    catch (error) {
        throw error;
    }
}
