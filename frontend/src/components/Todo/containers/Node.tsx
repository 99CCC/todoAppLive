import { ListGroup } from "react-bootstrap";
import { Node } from "../ApiController";

const NodeComp: React.FC<Node> = ({}) => {
    return(
<>
<ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
</>
    );
}

export default NodeComp