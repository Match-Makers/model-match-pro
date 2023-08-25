import { Spinner, Alert, ListGroup, ListGroupItem } from 'reactstrap';
import { usePrompts } from '@/contexts/prompts';
import { useModels } from '@/contexts/models';
import { useHistory } from '@/contexts/history';

export default function History() {
  const { models } = useModels();
  const {
    prompts,
    outputs,
    loading: promptsLoading,
    error: promptsError,
    deletePrompt,
  } = usePrompts();
  const { history, loading, error } = useHistory();
  console.warn('History:', {
    prompts,
    history,
    models,
    outputs,
    loading,
    error,
    promptsError,
    promptsLoading,
  });

  if (loading) return <Spinner />;

  if (error) return <Alert color="danger">Error loading prompt history!</Alert>;

  return (
    <ListGroup>
      {prompts.reverse().map((prompt, i) => {
        const promptDate = new Date(prompt.request_time);
        const options = {
          weekday: 'short',
          day: '2-digit', // DDD (short weekday name)
          month: 'short', // MMM (short month name)
          year: 'numeric', // YYYY (4-digit year)
          hour: '2-digit', // HH (2-digit hour)
          minute: '2-digit',
          second: '2-digit', // mm (2-digit minute)
        };
        return (
          <ListGroupItem key={i} onClick={() => deletePrompt(prompt.id)}>
            {`${new Intl.DateTimeFormat('en-US', options).format(
              promptDate
            )}: ${prompt.input_str}`}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
