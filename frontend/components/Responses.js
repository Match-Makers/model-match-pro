import Masonry from 'react-responsive-masonry';
import { Card, CardBody, CardText, Button, CardHeader } from 'reactstrap';

export default function Responses() {
  const responses = [
    'answer 1 jnmi0nfenijm vnuhnennfi2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn',
    'answer 2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn',
    'answer 3n 2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn',
    'answer 4n unvfununfvunikcdpinxu2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvn2ijnnfniufnminmfnunvfuhnfvnhnuhbnunvnuc',
  ];

  return (
    <Masonry gutter="1rem">
      {responses.map((model, index) => (
        <Card
          key={model}
          
           
        
        >
          <CardHeader>{model}</CardHeader>
          <CardBody>
            <CardText>{responses[index]}</CardText>
            <Button>Select</Button>
          </CardBody>
        </Card>
      ))}
    </Masonry>
  );
}
