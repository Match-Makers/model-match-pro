import { Badge } from 'reactstrap';
import { useModels } from '@/contexts/models';

export default function ModelList() {
  const { models, selectedModels, toggleModelActive } = useModels();

  return (
    <ul className="flex flex-row flex-wrap justify-center w-full max-w-4xl gap-2 p-0 mx-auto my-4">
      {models.map((model) => (
        <li key={model.id} className="text-2xl">
          <Badge
            href="#"
            tag="button"
            size="lg"
            pill
            onClick={() => toggleModelActive(model.id)}
            // key={model.id}
            color={
              selectedModels.some((m) => m === model.id)
                ? 'primary'
                : 'secondary'
            }
          >
            {model.name}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
