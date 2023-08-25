import { Spinner, Alert, ListGroup, ListGroupItem, Collapse } from 'reactstrap';
import { usePrompts } from '@/contexts/prompts';
import { useModels } from '@/contexts/models';
import { useHistory } from '@/contexts/history';

const DATE_OPTIONS = {
  weekday: 'short',
  day: '2-digit', // DDD (short weekday name)
  month: 'short', // MMM (short month name)
  year: 'numeric', // YYYY (4-digit year)
  hour: '2-digit', // HH (2-digit hour)
  minute: '2-digit',
  second: '2-digit', // mm (2-digit minute)
};

export function HistoryItem({
  deletePrompt,
  id,
  input_str,
  request_time,
  lang_models,
  user_id,
  output,
  ...props
}) {
  const promptDate = new Date(request_time);
  console.warn('HistoryItem', {
    id,
    input_str,
    request_time,
    deletePrompt: typeof deletePrompt,
  });
  return (
    <ListGroupItem onClick={() => deletePrompt(id)}>
      {`${new Intl.DateTimeFormat('en-US', DATE_OPTIONS).format(
        promptDate
      )}: ${input_str}`}
    </ListGroupItem>
  );
}

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
        return <HistoryItem key={i} {...prompt} deletePrompt={deletePrompt} />;
      })}
    </ListGroup>
  );
}
