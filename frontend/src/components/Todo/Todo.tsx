import React, { useEffect, useState } from "react";
import { createInstance, loadTodo, TodoItem } from "./ApiController";
import TodoChildComp from "./containers/TodoChild";
import TodoParent from "./containers/TodoParent";
import { authController } from "../../auth/authController";
import { authService } from "../../auth/authService";


interface TodoProps {
    userId: number;
    userName: string;
    token: string;
}

const Todo: React.FC<TodoProps> = ({ userId, userName, token }) => {
   // const [auth, setAuth] = useState(authService.getInstance(token).token);
    const [todos, setTodos] = useState<TodoItem[]>([]);
    
    useEffect(() => {
        createInstance(token).then(() => {
            const fetchTodos = async () => {
                try {
                    const todoRes = await loadTodo();
                    if (todoRes !== null) {
                        setTodos(todoRes);
                    }
                } catch (error) {
                    console.error("Failed to load todos:", error);
                }
            }
        fetchTodos();
        })

    }, [userId]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">{userName}'s Todo-List</h1>
            <div className="list-group">
                {todos.map((todo) => (
                    <TodoParent key={todo.todo_id} todo_id={todo.todo_id} todo_title={todo.title} />
                ))}
            </div>
        </div>
    );
};

export default Todo;