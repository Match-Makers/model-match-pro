import {
  Spinner,
  Alert,
  ListGroup,
  ListGroupItem,
  Collapse,
  Button,
} from 'reactstrap';
import { usePrompts } from '@/contexts/prompts';
import { useModels } from '@/contexts/models';
import { useHistory } from '@/contexts/history';
import Outputs from './Outputs';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/model_match_app/prompts/`;

const DATE_OPTIONS = {
  weekday: 'short',
  day: '2-digit', // DDD (short weekday name)
  month: 'short', // MMM (short month name)
  year: 'numeric', // YYYY (4-digit year)
  hour: '2-digit', // HH (2-digit hour)
  minute: '2-digit',
  second: '2-digit', // mm (2-digit minute)
};

export function HistoryItem({ deletePrompt, id, input_str, request_time }) {
  const { tokens } = useAuth();
  const { models } = useModels();

  const [isOpen, setIsOpen] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const promptDate = new Date(request_time);

  const toggle = () => setIsOpen(!isOpen);
  const handleDelete = (e) => {
    e.stopPropagation();
    deletePrompt(id);
  };

  function config() {
    return {
      headers: {
        Authorization: 'Bearer ' + tokens.access,
        'Content-Type': 'application/json',
      },
    };
  }

  useEffect(() => {
    if (isOpen) {
      try {
        fetch(`${apiUrl}${id}/responses/`, config())
          .then((res) => res.json())
          .then((outputs) => {
            const outputsWithModels = outputs.map((output) => {
              const model = models.find((m) => m.id === output.lang_model_id);
              return {
                ...model,
                output,
              };
            });
            setOutputs(outputsWithModels);
          });
      } catch (err) {
        setError(true);
        console.error(`Error fetching responses for prompt #${id}`, err);
      }
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <ListGroupItem>
      <div className="flex flex-row justify-between" onClick={toggle}>
        <div>
          {`${new Intl.DateTimeFormat('en-US', DATE_OPTIONS).format(
            promptDate
          )}: ${input_str}`}
        </div>
        <Button size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </div>
      <Collapse isOpen={isOpen}>
        <Outputs error={error} loading={loading} outputs={outputs} />
      </Collapse>
    </ListGroupItem>
  );
}

export default function History() {
  const { prompts, deletePrompt } = usePrompts();
  const { loading, error } = useHistory();

  if (loading) return <Spinner />;

  if (error) return <Alert color="danger">Error loading prompt history!</Alert>;

  return (
    <ListGroup>
      {prompts.reverse().map((prompt, i) => {
        return <HistoryItem key={i} {...prompt} deletePrompt={deletePrompt} />;
      })}
    </ListGroup>
  );
}
