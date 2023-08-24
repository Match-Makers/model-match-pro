import { Spinner, Alert } from 'reactstrap';
import { usePrompts } from '@/contexts/prompts';
import { useModels } from '@/contexts/models';
import { useHistory } from '@/contexts/history';

export default function History() {
  const { models } = useModels();
  const {
    outputs,
    loading: promptsLoading,
    error: promptsError,
  } = usePrompts();
  const { history, loading, error } = useHistory();

  console.warn('History:', {
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

  return <p>...History here</p>;
}
