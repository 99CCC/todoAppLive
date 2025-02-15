import axios from "axios";
import { AuthService, authService } from "../../auth/authService";


export interface TodoItem {
    todo_id: number,
    title: string,
    completed: boolean
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

export async function updateTodo(params:{ todoId: number, title?: string, depth?: number[], completed?: boolean}){
    try {
        console.log("params: ", params);
        const token = authService.getToken();
        const url = process.env.REACT_APP_UPDATE_TODO_URL;
        const res = await axios.put(url!, params, {headers: {Authorization: "Bearer "+token}});
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

export async function createTodo(todoId?: number, depth?: number[]){
    try {
        const token = authService.getToken();
        const url = process.env.REACT_APP_CREATE_TODO_URL;
        let body = {};
        if(todoId !== undefined){
        body = depth !==undefined ?
            {todoId, depth} : {todoId};
        }

        const res = await axios.post(url!, body, {headers: {Authorization: "Bearer "+token}});
        console.log(res.data);
        return res.status === 200 ? true: false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteTodo(todoId: number, table: string, depth?: number[]){
    try{
        const token = authService.getToken();
        let url = process.env.REACT_APP_DELETE_TODO_URL;
        url += `/${todoId}/${table}`;

        const body = depth !== undefined ? {depth} : undefined;

        console.log(body);

        const res = await axios.post(url!, body!, {headers: {Authorization: "Bearer "+token}});
        console.log(res);
        console.log("dis the url: ", url, body);
        if(res.status === 200){
            return true;
        }
        return false;

    }catch(error){
        console.error(error);
        return false;
    }
}


export async function createNode(depth: number[], todoId: number){
    try {
        const token = authService.getToken();
        const url = process.env.REACT_APP_CREATE_NODE_URL;
        console.log("createNode Url: ", url);
        const body = {depth, todoId};

        const res = await axios.post(url!, body, {headers:{Authorization: "Bearer "+token}});
        console.log(res);

        return res.status === 200 ? true: false;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function loadNode(depth: number[], todoId: number){
    try {
        const token = authService.getToken();
        const url = process.env.REACT_APP_LOAD_NODE_URL;
        const body = {depth, todoId};
        console.log("loadNode Url: ", url);
        const res = await axios.post(url!, body, {headers: {Authorization: "Bearer "+token}});
        return res.data.dbRes;
    } catch (error) {
        console.error(error);
        return false;

    }
}

export async function updateNode(nodeId: number, params: { body?: string, completed?: boolean}){
    try {
        const token = authService.getToken();
        let url = process.env.REACT_APP_UPDATE_NODE;
        url += "/"+nodeId;
        const res = await axios.put(url!, params, {headers: {Authorization: "Bearer "+token}});
        return res.status;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteNode(nodeId: number){
    try {
        const token = authService.getToken();
        let url = process.env.REACT_APP_DELETE_NODE;
        url += "/"+nodeId;
        const res = await axios.delete(url!, {headers: {Authorization: "Bearer "+token}});
        return res.status;
    } catch (error) {
        console.error(error);
        return false;
    }
}