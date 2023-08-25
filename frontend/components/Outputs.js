import Masonry from 'react-responsive-masonry';
import {
  Card,
  CardBody,
  CardText,
  Spinner,
  Alert,
  CardHeader,
} from 'reactstrap';

export default function Outputs({ outputs, loading, error }) {
  // if (!isDirty) return null;

  if (loading) return <Spinner />;

  if (error) return <Alert color="danger">Error retrieving prompt!</Alert>;

  return (
    <Masonry gutter="1rem">
      {outputs.map((model, index) => {
        const { output } = model;
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
