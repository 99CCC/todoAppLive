import React, { useEffect, useState } from "react";
import { loadTodoChild, TodoChild, TodoItem } from "../ApiController";
import TodoDetail from "./TodoDetail";
import { Row } from "react-bootstrap";

interface TodoChildProps {
    todo_id: number;
    depth: number[];
    body: string;
    title: string;
}

const TodoChildComp: React.FC<TodoChildProps> = ({ todo_id, depth, body, title }) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<TodoChild[]>([]);
    const [depth2, setDepth2] = useState<number[]>([0]);

    useEffect(() => {
        if(depth !== undefined){
        setDepth2(depth);
        };
    }, []);

    const toggleExpand = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        try {
            console.log(depth);
            const childrenRes = await loadTodoChild(0, todo_id, depth);
            if (childrenRes && childrenRes.length > 0) {
                setChildren(childrenRes);
            }
            setExpanded(true);
        } catch (error) {
            console.error("Failed to fetch children:", error);
        }
    };

    return (
        <div className="mb-2"
        style={{ marginLeft: `${depth.length * 20}px`}}>
        
            {/* Main Todo Item */}
            <Row>
            <div 
                className="d-flex justify-content-between align-items-center p-2 border rounded"
                
            >
         
                <span>{title}</span>
                <button className="btn btn-sm btn-primary" onClick={toggleExpand}>
                    {expanded ? "Hide" : "Expand"}
                </button>
 
            </div>
            </Row>
            <textarea style={{width: `100%`}}>{body}</textarea>
            <Row>
                
            </Row>
            {/* Child items */}
            {expanded && children.length > 0 && (
                <div className="mt-2">
                    {children.map((child) => (
                        <TodoChildComp key={child.todo_id} todo_id={todo_id} depth={child.depth} body={child.body} title={child.title}/>
                    ))}
                </div>
            )}

            {/* Render details if expanded */}
            {expanded && children.length === 0 && <TodoDetail details={`Details for ${title}`} />}
        </div>
    );
};

export default TodoChildComp;
