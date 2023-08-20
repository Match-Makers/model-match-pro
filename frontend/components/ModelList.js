import { ListGroup, ListGroupItem } from 'reactstrap';
import useModels from '@/hooks/useModels';

export default function ModelList() {
  const { models, toggleModelActive } = useModels();

  return (
    <ListGroup className="mx-4">
      {models.map((model) => (
        <ListGroupItem
          href="#"
          tag="button"
          onClick={() => toggleModelActive(model)}
          key={model.model}
          active={model.active}
        >
          {model.model}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
