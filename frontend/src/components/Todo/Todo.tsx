import React, { useEffect, useState } from "react";
import { loadTodo, TodoItem } from "./ApiController";
import TodoChildComp from "./containers/TodoChild";
import TodoParent from "./containers/TodoParent";

interface TodoProps {
    userId: number;
    userName: string;
}

const Todo: React.FC<TodoProps> = ({ userId, userName }) => {
    const [todos, setTodos] = useState<TodoItem[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todoRes = await loadTodo(userId);
                if (todoRes !== null) {
                    setTodos(todoRes);
                }
            } catch (error) {
                console.error("Failed to load todos:", error);
            }
        };

        fetchTodos();
    }, [userId]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">{userName}'s Todo-List</h1>
            <div className="list-group">
                {todos.map((todo) => (
                    <TodoParent key={todo.todo_id} todo_id={todo.todo_id} todo_title={todo.title} />
                    //<TodoChildComp key={todo.todo_id} todo={todo} depth={[todo.todo_id]} />
                ))}
            </div>
        </div>
    );
};

export default Todo;
