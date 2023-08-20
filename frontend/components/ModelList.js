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
          onClick={() => toggleModelActive(model.api_code)}
          key={model.api_code}
          active={selectedModels.some((m) => m === model.api_code)}
        >
          {model.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
