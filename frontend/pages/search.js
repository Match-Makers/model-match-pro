import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import ModelList from '@/components/ModelList';
import Outputs from '@/components/Outputs';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePrompts } from '@/contexts/prompts';
import { useModels } from '@/contexts/models';

import { AuthContext } from '@/contexts/auth';

export default function Search() {
  const { user } = useContext(AuthContext);
  const { push } = useRouter();
  const { models, selectedModels } = useModels();
  const { outputs, loading, error, isDirty } = usePrompts();

  const modelsWithResponses = models
    .filter((m) => selectedModels.includes(m.id))
    .map((model) => ({
      ...model,
      output: outputs.find((o) => o.lang_model_id === model.id),
    }));

  useEffect(() => {
    if (!user || !user.id) {
      push('/login');
    }
  }, [user]);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-1 px-0.5">
        <SearchBar>
          <ModelList />
        </SearchBar>
        {isDirty && (
          <Outputs
            outputs={modelsWithResponses}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </>
  );
}
