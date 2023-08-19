import { ListGroup, ListGroupItem } from 'reactstrap';

export default function ModelList(props) {
  return (
    <ListGroup className="mx-4">
      {props.models.map((model) => (
        <ListGroupItem
          href="#"
          tag="button"
          onClick={() => props.toggleModel(model)}
          key={model.model}
          active={model.active}
        >
          {model.model}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
