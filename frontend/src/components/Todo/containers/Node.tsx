import { Col, Container} from "react-bootstrap";
import { Node, updateNode } from "../ApiController";
import { useEffect, useState } from "react";

interface NodeProps {
    node: Node;
    child_depth: number[];
    todo_id: number;
    delete_node: Function;
}

const NodeComp: React.FC<NodeProps> = ({ node, child_depth, todo_id, delete_node}) => {
    const [localNode, setNode] = useState<Node>(node);
    const [text, setText] = useState<string>(node.body);
    const [body, setBody] = useState<string>(node.body);
    const [check, setCheck] = useState<boolean>(node.completed);
    const checkBoxUrl = "../../../images/CheckBox.svg";
    const checkBoxDoneUrl = "../../../images/CheckBoxChecked.svg"

    //OBS! This is a bad way to do it, ends up sending 1 req per change
    useEffect(() =>{
        const timeOutId = setTimeout(() => handleEditBody(text, localNode.node_id), 10);
        return () => clearTimeout(timeOutId);
    }, [text]);

    async function handleDelete() {
        await delete_node(localNode.node_id);
        };

    async function handleComplete(){ 
        const apiRes = await updateNode(localNode.node_id, {completed: !check})
        console.log(apiRes);
        setCheck(!check);
        console.log(check);
        };

    async function handleEditBody(value: string, node_id: number){
        setBody(value);
        let x = await updateNode(node_id, {body: value});
    };

    return (
        <>
            <div className="mb-2">
                <Container className="d-flex align-items-center hoverTodo">

                    <img src={check ? checkBoxDoneUrl : checkBoxUrl}
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