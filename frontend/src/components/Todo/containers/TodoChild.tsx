import React, { useState } from "react";
import { loadTodoChild, updateTodo, TodoChild, Node } from "../ApiController";
import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";

interface TodoChildProps {
    todo_id: number;
    child_completed: boolean;
    child_depth: number[];
    child_title: string;
    node: Node[];
    updateChildTitle: (childDepth: number[], newTitle: string) => void;
}

const TodoChildComp: React.FC<TodoChildProps> = ({
    todo_id,
    child_completed,
    child_depth,
    child_title,
    node,
    updateChildTitle,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<TodoChild[]>([]);
    const [show, setShow] = useState(false);
    const [localTitle, setTitle] = useState(child_title);
    const [localBody, setBody] = useState<string>();

    const handleClose = () => {
        setShow(false);
        setBody(node[0]?.body); 
    };

    const handleShow = () => setShow(true);

    const toggleExpand = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        try {
            const childrenRes = await loadTodoChild(todo_id, child_depth);
            if (childrenRes && childrenRes.length > 0) {
                setChildren(childrenRes);
            }
            setExpanded(true);
        } catch (error) {
            console.error("Failed to fetch children:", error);
        }
    };

    async function handleSave() {
        try {
            await updateTodo(todo_id, localTitle, child_depth);
            updateChildTitle(child_depth, localTitle);
            setShow(false);
        } catch (error) {
            console.error(error);
        }
    }

    const updateSubChildTitle = (childDepth: number[], newTitle: string) => {
        setChildren((prevChildren) =>
            prevChildren.map((child) =>
                JSON.stringify(child.child_depth) === JSON.stringify(childDepth)
                    ? { ...child, child_title: newTitle }
                    : child
            )
        );
    };


    return (
        <>
            <div className="mb-2" style={{ marginLeft: `${child_depth.length * 20}px` }}>
                <Row>
                    <div className="d-flex align-items-center p-2 border rounded">
                        <Col>
                            <span>{child_title}</span>
                        </Col>
                        <button className="btn btn-sm btn-secondary" onClick={handleShow}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-primary" onClick={toggleExpand}>
                            {expanded ? "Hide" : "Expand"}
                        </button>
                    </div>
                </Row>

                {expanded && children.length > 0 && (
                    <div className="mt-2">
                        {children.map((child) => (
                            <TodoChildComp
                                key={JSON.stringify(child.child_depth)}
                                todo_id={todo_id}
                                child_completed={child.child_completed}
                                child_depth={child.child_depth}
                                child_title={child.child_title}
                                node={child.node}
                                updateChildTitle={updateSubChildTitle}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Modal show={show} onHide={handleClose} className="modal-xl">
                <Modal.Header closeButton>
                    <h1>
                        <input
                            type="text"
                            value={localTitle}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ border: "0px", width: "100%", textIndent: "32px" }}
                            className="text-center"
                        />
                    </h1>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <ListGroup>
                        {node.map((node) => (
                    <ListGroup.Item>{node.body}</ListGroup.Item> /*REMEMBER NEED TO ITERATE AND MAKE NODES AS COMPS*/
                        ))}
                        </ListGroup>
                    </div>
                </Modal.Body>
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
