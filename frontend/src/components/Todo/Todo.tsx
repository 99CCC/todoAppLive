import React, { useEffect, useState } from "react";
import { createInstance, loadTodo, TodoItem, 
    deleteTodo as apiDeleteTodo, createTodo as apiCreateTodo } from "./ApiController";
import TodoParent from "./containers/TodoParent";
import { Button, ToggleButton } from "react-bootstrap";



interface TodoProps {
    inUserId: number;
    inUserName: string;
    inToken: string;
}

const Todo: React.FC<TodoProps> = ({ inUserId, inUserName, inToken }) => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [mode, setMode] = useState<boolean>(false);
    const visionMode = "dark-theme";
    const visionModeText = mode ? "Dark Mode" : "Light Mode";

    async function deleteTodo (todoId: number, table: string, depth: number[]){
        await apiDeleteTodo(todoId, table, depth);
        
        const todoRes = await loadTodo();
        if(todoRes != null){
            setTodos(todoRes);
        }
    }

    async function createTodo (){
        await apiCreateTodo();
        const todoRes = await loadTodo();
        if(todoRes != null){
            setTodos(todoRes);
        }
    }
    
    useEffect(() => {
        document.body.classList.add(visionMode);
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


    function modeSetter(){
        setMode(!mode);

        mode ? document.body.classList.add(visionMode) : document.body.classList.remove(visionMode);
    }


    return (
            <div className={`container mt-4`}>
                <ToggleButton id={""} value={""} onClick={modeSetter}>{visionModeText}</ToggleButton>
                <h1 className="text-center mb-4">{inUserName}'s Todo-List</h1>
                <div className="text-center mb-4">
                    <Button variant="outline-dark" onClick={createTodo}>Create New Todo Object</Button>
                </div>
                <div className="list-group">
                    {todos.map((todo) => (
                        <TodoParent key={todo.todo_id} inTodoId={todo.todo_id} inTodoTitle={todo.title} inTodoCompleted={todo.completed} deleteTodo={deleteTodo}/>
                    ))}
                </div>
            </div>
    );
};

export default Todo;