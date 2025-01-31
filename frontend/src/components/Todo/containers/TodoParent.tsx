import { useState } from "react";
import { loadTodoChild, TodoChild, updateTodo } from "../ApiController";
import TodoChildComp from "./TodoChild";
import { Button, Col, Container, DropdownButton, Modal } from "react-bootstrap";

interface TodoParentProps {
    inTodoId: number;
    inTodoTitle: string;
}

const TodoParent: React.FC<TodoParentProps> = ({ inTodoId, inTodoTitle }) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<TodoChild[]>([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(inTodoTitle);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleExpand = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        try {
            const childrenRes = await loadTodoChild(inTodoId);
            if (childrenRes && childrenRes.length > 0) {
                setChildren(childrenRes);
            }
            setExpanded(true);
        } catch (error) {
            console.error("Failed to fetch children:", error);
        }
    };

    async function handleSave() {
        await updateTodo(inTodoId, title);
        setShow(false);
    }

    const updateChildTitle = (childDepth: number[], newTitle: string) => {
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
            <div className="mb-2">
                <Container className="d-flex align-items-center">
                    <Container className="fluid d-flex align-items-center p-4 border rounded">
                        <Col>
                            <span>{title}</span>
                        </Col>
                        <button className="btn btn-sm btn-secondary" onClick={handleShow}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-primary" onClick={toggleExpand}>
                            {expanded ? "Hide" : "Expand"}
                        </button>
                    </Container>

                    <DropdownButton id={`dropdown-button-drop-end`} variant="secondary" drop="end" title={""} children={undefined} />
                </Container>

                {expanded && children.length > 0 && (
                    <div className="mt-2">
                        {children.map((child) => (
                            <TodoChildComp
                                key={JSON.stringify(child.child_depth)}
                                todo_id={inTodoId}
                                child_completed={child.child_completed}
                                child_depth={child.child_depth}
                                child_title={child.child_title}
                                node={child.node}
                                updateChildTitle={updateChildTitle}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Modal show={show}>
                <Modal.Header>
                    <h1>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ border: "0px", width: "100%", textIndent: "32px" }}
                            className="text-center"
                        />
                    </h1>
                </Modal.Header>
                <Modal.Body></Modal.Body>
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
