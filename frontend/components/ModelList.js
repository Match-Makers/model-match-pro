import { ListGroup, ListGroupItem } from 'reactstrap';
import useModels from '@/hooks/useModels';

export default function ModelList() {
  const { models, selectedModels, toggleModelActive } = useModels();

  return (
    <ListGroup className="mx-4">
      {models.map((model) => (
        <ListGroupItem
          href="#"
          tag="button"
          onClick={() => toggleModelActive(model.code)}
          key={model.code}
          active={selectedModels.some((m) => m === model.code)}
        >
          {model.model}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
