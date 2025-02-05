import { Button, Col, Container, ListGroup } from "react-bootstrap";
import { createNode, loadNode, Node } from "../ApiController";
import { useState } from "react";

interface NodeProps {
    node: Node;
    child_depth: number[];
    todo_id: number;
}

const NodeComp: React.FC<NodeProps> = ({ node, child_depth, todo_id }) => {
    const [localNode, setNode] = useState<Node>(node);
    const [body, setBody] = useState<string>(node.body);
    const checkBoxUrl = "../../../images/CheckBox.svg";
    const checkBoxDoneUrl = "../../../images/CheckBox.svg"

    function handleDelete(): void {
        throw new Error("Function not implemented.");
    }

    function handleComplete(): void {
        throw new Error("Function not implemented.");
    }

    function handleEditBody(value: string, node_id: number): void {
        setBody(value);
        //implement savetoapi
    }

    return (
        <>
            <div className="mb-2">
                <Container className="d-flex align-items-center hoverTodo">

                    <img src={node.completed ? checkBoxUrl : checkBoxDoneUrl}
                        style={{ width: `3%`, height: `3%`, fill: "none" }}
                        onClick={handleComplete} className="hoverButtons" />

                    <Container className="fluid d-flex align-items-center">
                        <Col>
                            <input
                                type="text"
                                value={node.body}
                                onChange={(e) => handleEditBody(e.target.value, node.node_id)}
                                style={{ border: "1px", width: "100%", textIndent: "32px" }}
                                className="text-center"
                            />

                        </Col>
                    </Container>
                    <img src="../../../images/deleteButton.svg"
                        style={{ width: `3%`, height: `3%`, fill: "none" }}
                        onClick={handleDelete} className="hoverButtons" />
                </Container>
            </div>
        </>
    );
}

export default NodeComp