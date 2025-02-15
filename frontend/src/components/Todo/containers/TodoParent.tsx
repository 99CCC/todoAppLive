import { useState } from "react";
import { createTodo, loadTodoChild, TodoChild, updateTodo } from "../ApiController";
import TodoChildComp from "./TodoChild";
import { Button, Col, Container, Modal } from "react-bootstrap";

interface TodoParentProps {
    inTodoId: number;
    inTodoTitle: string;
    inTodoCompleted: boolean;
    deleteTodo: Function;
}

const TodoParent: React.FC<TodoParentProps> = ({ inTodoId, inTodoTitle, inTodoCompleted, deleteTodo }) => { 
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<TodoChild[]>([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(inTodoTitle);
    const [localCompleted, setCompleted] = useState<boolean>(inTodoCompleted);
    const checkBoxUrl = "../../../images/CheckBox.svg";
    const checkBoxDoneUrl = "../../../images/CheckBoxChecked.svg"
    const background = inTodoCompleted ? "0 255 0" : "255 255 0";

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const handleCreate = async (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        const apiRes = await createTodo(inTodoId);
        const childrenRes = await loadTodoChild(inTodoId);
        if (childrenRes && childrenRes.length > 0) {
            setChildren(childrenRes);
        }
        return;
    }

    const toggleExpand = async (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
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
        await updateTodo({todoId: inTodoId, title: title});
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

    const removeChildByDepth = (childDepth: number[]) => {
        setChildren((prevChildren) =>
            prevChildren.filter((child) =>
                JSON.stringify(child.child_depth) !== JSON.stringify(childDepth)
            )
        );
    };

    async function handleDelete(e: { stopPropagation: () => void; }): Promise<void> {
        e.stopPropagation();
        await deleteTodo(inTodoId, "active")
    }

    async function handleComplete(e: {stopPropagation: () => void; }){
        e.stopPropagation();
        setCompleted(!localCompleted);
        await updateTodo({todoId: inTodoId, completed: !localCompleted});
    }

    //HANDLESHOW FOR CONTAINER: Figure out structure for only using onclick when not layered
    return (
        <>
            <div>
                <Container className="d-flex align-items-center p-4 border rounded hoverTodo" onClick={handleShow} style={{backgroundColor: `rgb(${background} / 0.1)`}}>
                    <Container className="fluid d-flex align-items-center"> 
                    <img src={localCompleted ? checkBoxDoneUrl : checkBoxUrl} 
                    style={{
                            width: `3%`, height: `3%`, fill: "none"
                        }}
                        onClick={handleComplete} className="hoverButtons"
                        />
                        <Col>
                            <span>{title}</span>
                        </Col>
                    </Container>
                        <img src="../../../images/deleteButton.svg" style={{
                            width: `3%`, height: `3%`, fill: "none"
                        }}
                        onClick={handleDelete} className="hoverButtons"
                        />
                        <img src="../../../images/editButton.svg" style={{
                            width: `3%`, height: `3%`, fill: "none"
                        }}
                        onClick={handleShow} className="hoverButtons"
                        />
                        <img src="../../../images/expandButton.svg" style={{
                            width: `3%`, height: `3%`, fill: "none", 
                            transform: expanded ? `rotate(180deg)` : '',
                            transition: `transform 150ms ease`
                        }}
                        onClick={toggleExpand} className="hoverButtons"
                        />
                        <img src="../../../images/createButton.svg" style={{
                            width: `3%`, height: `3%`, fill: "none"
                        }}
                        onClick={handleCreate} className="hoverButtons"
                        />                                                 
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
                                removeChildByDepth={removeChildByDepth}
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
