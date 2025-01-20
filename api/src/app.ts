import * as dotenv from 'dotenv';
dotenv.config();
import {createServer} from "./server/createServer.js";

async function main(){
    try {
        const app = createServer();
        const port = process.env.ApiPort || 3001;

        (await app).listen(port, () => {
            console.log("Server started. Listening on port: ", port)
        });

    } catch (error) {
        console.error('An error has occured', error);
        process.exit
    }
}
main();