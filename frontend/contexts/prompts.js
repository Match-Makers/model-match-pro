import useSWR from 'swr';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/model_match_app/prompts/`;

import { useAuth } from '@/contexts/auth';
import { createContext, useContext, useState } from 'react';

export const PromptsContext = createContext({
  prompts: [],
  error: false,
  loading: false,
  isDirty: false,
  createPrompt: () => undefined,
});

export function usePrompts() {
  const context = useContext(PromptsContext);
  if (!context) {
    throw new Error('You forgot PromptsProvider!');
  }
  return context;
}

export default function PromptsProvider(props) {
  const { user, tokens } = useAuth();
  const { data: prompts = [], mutate } = useSWR([apiUrl, tokens], fetchPrompts);
  const [outputs, setOutputs] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.warn('PromptsProvider', { prompts });
  async function fetchPrompts() {
    try {
      if (!tokens) {
        throw new Error('No auth tokens found');
      }
      const response = await fetch(apiUrl, config());
      const responseJSON = await response.json();
      console.warn('fetchPrompts', { responseJSON });
      return responseJSON;
    } catch (err) {
      handleError(err);
    }
  }

  async function createPrompt(info) {
    try {
      setError(false);
      setOutputs([]);
      setIsDirty(true);
      setLoading(true);
      const options = {
        ...config(),
        method: 'POST',
        body: JSON.stringify({
          ...info,
          user_id: user.id,
        }),
      };
      console.log('createPrompt', { info, options });
      const promptFromBackend = await fetch(apiUrl, options).then((res) =>
        res.json()
      );

      const responsesFromBackend = await fetch(
        // BUG: Something has a zero index, something does not
        // WORKAROUND: prompt_id + 1 is the primary key of the prompt we generated
        `${apiUrl}${promptFromBackend.id + 1}/responses/`,
        config()
      ).then((res) => res.json());
      setOutputs(responsesFromBackend);
      console.warn({ responsesFromBackend });
    } catch (err) {
      handleError(err);
      setError(true);
    }
    setLoading(false);
  }

  function handleError(err) {
    console.error(`fetchPrompts: ${err}`);
  }

  function config() {
    return {
      headers: {
        Authorization: 'Bearer ' + tokens.access,
        'Content-Type': 'application/json',
      },
    };
  }

  async function deletePrompt(id) {
    try {
      const url = apiUrl + id;
      const options = config();
      options.method = 'DELETE';
      await fetch(url, options);
      mutate();
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <PromptsContext.Provider
      value={{
        prompts,
        outputs,
        error,
        isDirty,
        loading,
        createPrompt,
        deletePrompt,
      }}
    >
      {props.children}
    </PromptsContext.Provider>
  );
}
