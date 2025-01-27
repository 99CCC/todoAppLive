import React, { useState } from "react";
import { loadTodoChild, saveTodoChild, TodoChild, TodoItem } from "../ApiController";
import TodoDetail from "./TodoDetail";
import { Button, Col, Modal, Row } from "react-bootstrap";

interface TodoChildProps {
    todo_id: number;
    depth: number[];
    body: string;
    title: string;
}

const TodoChildComp: React.FC<TodoChildProps> = ({ todo_id, depth, body, title }) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<TodoChild[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [text, setText] = useState<string>(body);

    const handleClose = () => {setShow(false); setText(body);}
    const handleShow = () => setShow(true);


    const toggleExpand = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        try {
            const childrenRes = await loadTodoChild(todo_id, depth);
            if (childrenRes && childrenRes.length > 0) {
                setChildren(childrenRes);
            }
            setExpanded(true);
        } catch (error) {
            console.error("Failed to fetch children:", error);
        }
    };


    //Maybe add in some more failsafes, +add in green checkmark when save = true
    async function handleSave() {
        try {
            await saveTodoChild(depth,todo_id,text);
            setShow(false);
        } catch (error) {
            
            console.error(error);
        }
    }

    return (
        <>
            <div className="mb-2"
                style={{ marginLeft: `${depth.length * 20}px` }}>

                {/* Main Todo Item */}
                <Row>
                    <div className="d-flex align-items-center p-2 border rounded">
                        <Col>
                            <span>{title}</span>
                        </Col>
                        <button className="btn btn-sm btn-secondary" onClick={handleShow}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-primary" onClick={toggleExpand}>
                            {expanded ? "Hide" : "Expand"}
                        </button>


                    </div>
                </Row>

                {/* Child items */}
                {expanded && children.length > 0 && (
                    <div className="mt-2">
                        {children.map((child) => (
                            <TodoChildComp key={child.depth.toString()} todo_id={todo_id} depth={child.depth} body={child.body} title={child.title} />
                        ))}
                    </div>
                )}

                {/* Render details if expanded */}
                {expanded && children.length === 0 && <TodoDetail details={`Details for ${title}`} />}
            </div>

            <Modal show={show} onHide={handleClose} className="modal-xl">
                <Modal.Header closeButton className="d-flex align-items-cente">
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body><textarea value={text} onChange={(e) => setText(e.target.value)} style={{ width: `100%`, height: `100%` }}></textarea></Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose} style={{ width: `100%` }}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSave} style={{ width: `100%` }}>
                        <h4>Save Changes</h4>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TodoChildComp;
