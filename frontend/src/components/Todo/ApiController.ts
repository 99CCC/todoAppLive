import axios from "axios";

export interface TodoItem {
    todo_id: number,
    title: string
}

export interface TodoChild {
    todo_id: number,
    completed: boolean,
    title: string,
    body: string,
    depth: number[]
}

export async function loadTodo(userId: number){
    try{
        const url = "http://localhost:3001/loadTodo/active"
        const res = await axios.get(url, {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTczNzkwNDA0OSwiZXhwIjoxNzM3OTkwNDQ5fQ.S2cFjE03IkQbNGXvp0w-4_HEqusyE7jjXSfOVxL0zWw"}});
        const resdata: TodoItem[] = res.data.data;
        console.log(resdata);
        return resdata;
    }catch(error){
        console.error(error);
        return null;
    }
}

export async function loadTodoChild(userId: number, todoId: number, depth?: number[]){
    try {
        const url = "http://localhost:3001/loadTodoChild"
        let body = {};
        if(depth !== undefined){
           body = {
            todoId: todoId, type: "child", table: "active", depth: depth
           } 
        }else{
            body = {
                todoId: todoId, type: "parent", table: "active" 
            }
        }
        console.log(body);
       const res = await axios.post(url, body, {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTczNzkwNDA0OSwiZXhwIjoxNzM3OTkwNDQ5fQ.S2cFjE03IkQbNGXvp0w-4_HEqusyE7jjXSfOVxL0zWw"}});
        const resData: TodoChild[] = res.data.dbRes;
        console.log(res.data.dbRes);
        return resData;

    } catch (error) {
        throw error;
    }
}