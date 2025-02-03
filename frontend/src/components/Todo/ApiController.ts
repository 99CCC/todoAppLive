import axios from "axios";
import { authService } from "../../auth/authService";


export interface TodoItem {
    todo_id: number,
    title: string
}

export interface TodoChild {
    todo_id: number,
    child_completed: boolean,
    child_depth: number[],
    child_title: string,
    node: Node[]
}

export interface Node {
    node_id: number,
    completed: boolean,
    body: string
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

export async function updateTodo(todoId: number, title: string, depth?: number[]){
    try {
        const token = authService.getToken();
        const url = process.env.REACT_APP_UPDATE_TODO_URL;
        let body: any = {todoId, title};
        depth !== undefined && (body['depth'] = depth);

        const res = await axios.put(url!, body, {headers: {Authorization: "Bearer "+token}});
        return res.status; 
    } catch (error) {
        console.error(error);
        return false;
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
        return resData;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function createTodo(todoId: number, depth?: number[]){
    try {
        const token = authService.getToken();
        const url = process.env.REACT_APP_CREATE_TODO_URL;
        let body = depth !==undefined ?
            {todoId, depth} : {todoId};
        const res = await axios.post(url!, body, {headers: {Authorization: "Bearer "+token}});
        console.log(res.data);
        debugger;
        return res.status === 200 ? true: false;
    } catch (error) {
        console.error(error);
        return false;
    }
}
