import { useState } from "react";
import { loadTodoChild, TodoChild } from "../ApiController";
import TodoChildComp from "./TodoChild";
import TodoDetail from "./TodoDetail";

interface TodoParentProps {
    todo_id: number;
    todo_title: string;
}

const TodoParent: React.FC<TodoParentProps> = ({ todo_id, todo_title }) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<TodoChild[]>([]);

    const toggleExpand = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        try {
            const childrenRes = await loadTodoChild(0, todo_id);
            if (childrenRes && childrenRes.length > 0) {
                setChildren(childrenRes);
            }
            setExpanded(true);
        } catch (error) {
            console.error("Failed to fetch children:", error);
        }
    };

    return (
        <div className="mb-2">
            {/* Main Todo Item */}
            <div 
                className="d-flex justify-content-between align-items-center p-2 border rounded"
            >
                <span>{todo_title}</span>
                <button className="btn btn-sm btn-primary" onClick={toggleExpand}>
                    {expanded ? "Hide" : "Expand"}
                </button>
            </div>

            {/* Child items */}
            {expanded && children.length > 0 && (
                <div className="mt-2">
                    {children.map((child) => (
                        <TodoChildComp todo_id={todo_id} body={child.body} title={child.title} depth={child.depth}/>
                    ))}
                </div>
            )}

            {/* Render details if expanded */}
            {expanded && children.length === 0 && <TodoDetail details={`Details for ${todo_title}`} />}
        </div>
    );
};

export default TodoParent;
