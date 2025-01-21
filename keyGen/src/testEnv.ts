import * as dotenv from 'dotenv';
dotenv.config();

function testEnv(){
    const x = process.env.TEST;
    console.log("Node Proccess gives: ", x);

    const y = process.env.TEST;
    console.log("dotenv gives: ", y);
    //so both have same syntax but without import and setting dotenv.config it gives undefined
}
testEnv();