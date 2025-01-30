import axios from "axios";
import { authService } from "../../auth/authService";


export interface TodoItem {
    todo_id: number,
    title: string
}

export interface TodoChild {
    inTodoId: number,
    completed: boolean,
    title: string,
    body: number[],
    depth: number[]
}

export async function createInstance(token: string) {
    authService.setToken(token);
}

export async function loadTodo(){
    try{
        const token = authService.getToken();
        const url = process.env.REACT_APP_LOAD_TODO_URL;
        const res = await axios.get(url!, {headers: {Authorization: "Bearer "+token}});
        const resdata: TodoItem[] = res.data.data;
        return resdata;
    }catch(error){
        console.error(error);
        return null;
    }
}

export async function loadTodoChild(todoId: number, depth?: number[]){
    try {
        const token = authService.getToken();
        const url = process.env.REACT_APP_LOAD_TODO_CHILD_URL;
        let body = depth !== undefined ?
            {todoId, type: "child", table: "active", depth} :
                {todoId, type: "parent", table: "active"};
        const res = await axios.post(url!, body, {headers: {Authorization: "Bearer "+token}});
        const resData: TodoChild[] = res.data.dbRes;
        console.log(resData);
        return resData;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function saveTodoChild(depth: number[], todoId: number, body: string){
    try {
        const url = process.env.REACT_APP_UPDATE_TODO_URL;
        const token = authService.getToken();
        const jsonBody = {depth, todoId, body};
        const res = await axios.put(url!,jsonBody, {headers:{Authorization: "Bearer "+token}})
            return res.status === 200;

    } catch (error) {
        console.error(error);
        return false;
    }
}