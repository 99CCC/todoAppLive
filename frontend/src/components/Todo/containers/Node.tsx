import { Button, Col, Container, ListGroup } from "react-bootstrap";
import { createNode, loadNode, Node, updateNode } from "../ApiController";
import { useEffect, useState } from "react";

interface NodeProps {
    node: Node;
    child_depth: number[];
    todo_id: number;
}

const NodeComp: React.FC<NodeProps> = ({ node, child_depth, todo_id }) => {
    const [localNode, setNode] = useState<Node>(node);
    const [text, setText] = useState<string>(node.body);
    const [body, setBody] = useState<string>(node.body);
    const checkBoxUrl = "../../../images/CheckBox.svg";
    const checkBoxDoneUrl = "../../../images/CheckBox.svg"

    useEffect(() =>{
        const timeOutId = setTimeout(() => handleEditBody(text, localNode.node_id), 500);
        return () => clearTimeout(timeOutId);
    }, [text]);

    function handleDelete(): void {
        throw new Error("Function not implemented.");
    }

    function handleComplete(): void {
        throw new Error("Function not implemented.");
    }

    async function handleEditBody(value: string, node_id: number): Promise<void> {
        setBody(value);
        let x = await updateNode(node_id, {body: value});
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
                                value={body}
                                onChange={(e) => setText(e.target.value)}
                                style={{ border: "1px", width: "100%", textIndent: "32px" }}
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