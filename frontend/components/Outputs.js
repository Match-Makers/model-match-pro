import Masonry from 'react-responsive-masonry';
import { Card, CardBody, CardText, Button, CardHeader } from 'reactstrap';
import { usePrompts } from '@/contexts/prompts';
import { useModels } from '@/contexts/models';
const responses = [
  {
    model: 'Bard',
    response:
      "Here is a bunch of text that seems really important right now. We would love to have some longer responses so let's keep going.",
  },
  {
    model: 'GPT',
    response:
      "Here is a bunch of text that seems really important right now. We would love to have some longer responses so let's keep going.",
  },
  {
    model: 'JerryBot',
    response:
      "Here is a bunch of text that seems really important right now. We would love to have some longer responses so let's keep going.",
  },
  {
    model: 'DeioshaBot',
    response:
      "Here is a bunch of text that seems really important right now. We would love to have some longer responses so let's keep going.",
  },
];

export default function Outputs() {
  const { models, selectedModels } = useModels();
  const { outputs } = usePrompts();

  const activeModels = models.filter((m) => selectedModels.includes(m.id));

  const mapModelIdsToOutputs = selectedModels.reduce((acc, modelId) => {
    acc[modelId] = outputs.find((o) => o.lang_model_id === modelId);
    return acc;
  }, {});

  console.warn({ mapModelIdsToOutputs, outputs, selectedModels });

  return (
    <Masonry gutter="1rem">
      {activeModels.map((model, index) => {
        const output = mapModelIdsToOutputs[model.id];
        return (
          <Card key={index}>
            <CardHeader>{model.name}</CardHeader>
            <CardBody>
              {output ? (
                <>
                  <CardText>{output.response}</CardText>
                  <Button>Retry</Button>
                </>
              ) : (
                <CardText>Click Search when ready</CardText>
              )}
            </CardBody>
          </Card>
        );
      })}
      {/* {responses.map((apiResponse) => (
        <Card key={apiResponse.model}>
          <CardHeader>{apiResponse.model}</CardHeader>
          <CardBody>
            <CardText>{apiResponse.response}</CardText>
            <Button>Retry</Button>
          </CardBody>
        </Card>
      ))} */}
    </Masonry>
  );
}
