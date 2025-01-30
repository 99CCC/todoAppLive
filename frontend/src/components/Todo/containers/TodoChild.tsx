import React, { useState } from "react";
import { loadTodoChild, saveTodoChild, TodoChild, Node } from "../ApiController";
import TodoDetail from "./TodoDetail";
import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";


const TodoChildComp: React.FC<TodoChild> = ({ todo_id, child_completed, child_depth, child_title, node }) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState<TodoChild[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [localTitle, setTitle] = useState<string>(child_title);
    const [localBody, setBody] = useState<string>();
    const [localNode, setNode] = useState<any[]>(node);

    const handleClose = () => {setShow(false); setBody(node[0].body);} //<-- OBS! need to know which one we're setting
        //Set node[x] as params here

    const handleShow = () =>{setShow(true);}


    const toggleExpand = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        try {
            const childrenRes = await loadTodoChild(todo_id, child_depth);
            console.log(childrenRes);
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
            await saveTodoChild(child_depth, todo_id, child_title);
            setShow(false);
        } catch (error) {
            
            console.error(error);
        }
    }

    return (
        <>
            <div className="mb-2"
                style={{ marginLeft: `${child_depth.length * 20}px` }}>

                {/* Main Todo Item */}
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

                {/* Child items */}
                {expanded && children.length > 0 && (
                    <div className="mt-2">
                        {children.map((child) => (
                            <TodoChildComp key={child.child_depth.toString()} 
                            todo_id={todo_id} child_completed={child.child_completed} 
                            child_depth={child.child_depth} child_title={child.child_title} 
                            node={child.node}/>
                        ))}
                    </div>
                )}

                {/* Render details if expanded */}
                {expanded && children.length === 0 && <TodoDetail details={`Details for ${child_title}`} />}
            </div>

            <Modal show={show} onHide={handleClose} className="modal-xl">
                <Modal.Header closeButton className="d-flex align-items-cente">
                    <Modal.Title>{child_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                {show && localNode.length > 0 && (
                    <div>
                        <ListGroup>
                        {localNode.map((node) => (
                    <ListGroup.Item>{node.body}</ListGroup.Item>
                        ))}
                        </ListGroup>
                    </div>
                )}
                     
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
