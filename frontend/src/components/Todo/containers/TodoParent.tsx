import { useState } from "react";
import { loadTodoChild, TodoChild } from "../ApiController";
import TodoChildComp from "./TodoChild";
import TodoDetail from "./TodoDetail";
import { Button, Col, Container, DropdownButton, Modal } from "react-bootstrap";

interface TodoParentProps {
    todo_id: number;
    todo_title: string;
}

const TodoParent: React.FC<TodoParentProps> = ({ todo_id, todo_title }) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<TodoChild[]>([]);
    const [show, setShow] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(todo_title)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleExpand = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        try {
            const childrenRes = await loadTodoChild(todo_id);
            if (childrenRes && childrenRes.length > 0) {
                setChildren(childrenRes);
            }
            setExpanded(true);
        } catch (error) {
            console.error("Failed to fetch children:", error);
        }
    };

    function handleSave() {
        //Implement setTitle()
        setShow(false);
    }

    return (
        <>
            <div className="mb-2">
                {/* Main Todo Item */}
                <Container className="d-flex align-items-center">

                    <Container className="fluid d-flex align-items-center p-4 border rounded">
                        <Col>
                            <span>{title}</span>
                        </Col>
                        <button className="btn btn-sm btn-secondary" onClick={handleShow} style={{}}>
                            Edit</button>
                        <button className="btn btn-sm btn-primary" onClick={toggleExpand}>
                            {expanded ? "Hide" : "Expand"}
                        </button>
                    </Container>

                    {/* Delete Button with animation*/}

                    <DropdownButton
                        id={`dropdown-button-drop-end`}
                        variant="secondary"
                        drop="end"
                        title={""} children={undefined}
                    />


                </Container>

                {/* Child items */}
                {expanded && children.length > 0 && (
                    <div className="mt-2">
                        {children.map((child) => (
                            <TodoChildComp todo_id={todo_id} body={child.body} title={child.title} depth={child.depth} />
                        ))}
                    </div>
                )}

                {/* Render details if expanded */}
                {expanded && children.length === 0 && <TodoDetail details={`Details for ${title}`} />}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="d-flex align-items-cente">
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Awaiting implementation of stats showing x/y subtasks done</Modal.Body>
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

export default TodoParent;
