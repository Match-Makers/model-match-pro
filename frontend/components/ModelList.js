import { ListGroup, ListGroupItem } from 'reactstrap';
import { useModels } from '@/contexts/models';

export default function ModelList() {
  const { models, selectedModels, toggleModelActive } = useModels();

  return (
    <ListGroup horizontal className="mx-auto">
      {models.map((model) => (
        <ListGroupItem
          href="#"
          tag="button"
          onClick={() => toggleModelActive(model.id)}
          key={model.id}
          active={selectedModels.some((m) => m === model.id)}
        >
          {model.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
