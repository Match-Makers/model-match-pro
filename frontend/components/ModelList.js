import { ListGroup, ListGroupItem } from 'reactstrap';
import useModels from '@/hooks/useModels';

export default function ModelList() {
  const { models, selectedModels, toggleModelActive } = useModels();
  console.warn('ModelList:useModels', [...selectedModels]);

  return (
    <ListGroup className="mx-4">
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
