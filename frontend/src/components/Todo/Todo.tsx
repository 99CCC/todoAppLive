import React, { useEffect, useState } from "react";
import { createInstance, loadTodo, TodoItem } from "./ApiController";
import TodoParent from "./containers/TodoParent";



interface TodoProps {
    inUserId: number;
    inUserName: string;
    inToken: string;
}

const Todo: React.FC<TodoProps> = ({ inUserId, inUserName, inToken }) => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    
    useEffect(() => {
        createInstance(inToken).then(() => {
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

    }, [inUserId]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">{inUserName}'s Todo-List</h1>
            <div className="list-group">
                {todos.map((todo) => (
                    <TodoParent key={todo.todo_id} inTodoId={todo.todo_id} inTodoTitle={todo.title} />
                ))}
            </div>
        </div>
    );
};

export default Todo;