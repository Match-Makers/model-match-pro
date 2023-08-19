import Masonry from 'react-responsive-masonry';
import { Card, CardBody, CardText, Button, CardHeader } from 'reactstrap';

export default function Responses() {
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

  return (
    <Masonry gutter="1rem">
      {responses.map((apiResponse) => (
        <Card key={apiResponse.model}>
          <CardHeader>{apiResponse.model}</CardHeader>
          <CardBody>
            <CardText>{apiResponse.response}</CardText>
            <Button>Retry</Button>
          </CardBody>
        </Card>
      ))}
    </Masonry>
  );
}
