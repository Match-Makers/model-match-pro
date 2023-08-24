import Masonry from 'react-responsive-masonry';
import {
  Card,
  CardBody,
  CardText,
  Spinner,
  Alert,
  CardHeader,
} from 'reactstrap';
import { usePrompts } from '@/contexts/prompts';
import { useModels } from '@/contexts/models';

export default function Outputs() {
  const { models, selectedModels } = useModels();
  const { outputs, loading, error, isDirty } = usePrompts();

  const activeModels = models.filter((m) => selectedModels.includes(m.id));

  const mapModelIdsToOutputs = selectedModels.reduce((acc, modelId) => {
    acc[modelId] = outputs.find((o) => o.lang_model_id === modelId);
    return acc;
  }, {});

  if (!isDirty) return null;

  if (loading) return <Spinner />;

  if (error) return <Alert color="danger">Error creating prompt!</Alert>;

  return (
    <Masonry gutter="1rem">
      {activeModels.map((model, index) => {
        const output = mapModelIdsToOutputs[model.id];
        const modelHasError = !output || !output.response;
        return (
          <Card key={index}>
            <CardHeader className="font-bold">{model.name}</CardHeader>
            <CardBody>
              {modelHasError ? (
                <Alert color="warning" className="italic">
                  The model was unable to provide a response
                </Alert>
              ) : (
                <CardText>{output.response}</CardText>
              )}
            </CardBody>
          </Card>
        );
      })}
    </Masonry>
  );
}
