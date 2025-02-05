import React, { useState } from "react";
import { loadTodoChild, updateTodo, TodoChild, Node, createTodo, deleteTodo as apiDeleteTodo, createNode, loadNode } from "../ApiController";
import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import NodeComp from "./Node";

interface TodoChildProps {
    todo_id: number;
    child_completed: boolean;
    child_depth: number[];
    child_title: string;
    node: Node[];
    updateChildTitle: (childDepth: number[], newTitle: string) => void;
    removeChildByDepth: Function;
}

const TodoChildComp: React.FC<TodoChildProps> = ({
    todo_id,
    child_completed,
    child_depth,
    child_title,
    node,
    updateChildTitle,
    removeChildByDepth
}) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<TodoChild[]>([]);
    const [show, setShow] = useState(false);
    const [localTitle, setTitle] = useState(child_title);
    const [localBody, setBody] = useState<string>();
    const [localNode, setNode] = useState<Node[]>(node);

    const handleClose = () => {
        setShow(false);
        setBody(node[0]?.body);
    };

    const handleShow = () => setShow(true);
    const handleCreate = async (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        const apiRes = await createTodo(todo_id, child_depth);
        console.log(apiRes);
        const childrenRes = await loadTodoChild(todo_id, child_depth);
        if (childrenRes && childrenRes.length > 0) {
            setChildren(childrenRes);
        }
        return;
    };

    const toggleExpand = async (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
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

    const removeSubChildByDepth = (childDepth: number[]) => {
        setChildren((prevChildren) =>
            prevChildren.filter((child) =>
                JSON.stringify(child.child_depth) !== JSON.stringify(childDepth)
            )
        );
    };


    async function handleDelete(e: { stopPropagation: () => void; }) {
        e.stopPropagation();
        await apiDeleteTodo(todo_id, "active", child_depth);
        await removeChildByDepth(child_depth);
    }

    const handleCreateNode = async (e: { stopPropagation: () => void; }) => {
        const apiRes = await createNode(child_depth, todo_id);
        console.log(apiRes);
        const nodeRes = await loadNode(child_depth, todo_id);
        console.log(nodeRes);
        if (nodeRes && nodeRes.length > 0) {
            setNode(nodeRes);
        }
        return;
    };


    return (
        <>
            <div className="mb-2" style={{ marginLeft: `${child_depth.length * 20}px` }}>

                <div className="d-flex align-items-center p-2 border rounded hoverTodo" onClick={handleShow}>
                    <Col>
                        <span>{child_title}</span>
                    </Col>
                    <img src="../../../images/deleteButton.svg"
                        style={{ width: `3%`, height: `3%`, fill: "none" }}
                        onClick={handleDelete} className="hoverButtons" />

                    <img src="../../../images/editButton.svg"
                        style={{ width: `3%`, height: `3%`, fill: "none" }}
                        onClick={handleShow} className="hoverButtons" />

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
                </div>

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
                                removeChildByDepth={removeSubChildByDepth}
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
                            value={child_title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ border: "0px", width: "100%", textIndent: "32px" }}
                            className="text-center"
                        />
                    </h1>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center mb-4">
                    <Button variant="outline-dark" onClick={handleCreateNode} style={{marginBottom: `1%`}}>New Node</Button>
                    {localNode.map((node) => (
                        <NodeComp key={node.node_id} node={node} child_depth={child_depth} todo_id={todo_id}/>
                    ))}
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
