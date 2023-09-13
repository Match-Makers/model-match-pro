import useSWR from 'swr';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/model_match_app/prompts/`;

import { useAuth } from '@/contexts/auth';
import { createContext, useContext, useState } from 'react';

export const PromptsContext = createContext({
  prompts: [],
  outputs: [],
  error: false,
  loading: false,
  isDirty: false,
  createPrompt: (info: any) => info,
  setIsDirty: (info: any) => info,
  deletePrompt: (foo: any) => foo,
});

export function usePrompts() {
  const context = useContext(PromptsContext);
  if (!context) {
    throw new Error('You forgot PromptsProvider!');
  }
  return context;
}

/** Example Prompt:
{
  "id": 79,
  "input_str": "asWhat is the meaning of life?aassaasasasassasdssdasassasasas",
  "request_time": "2023-08-22T03:55:35.966303Z",
  "lang_models": [],
  "user_id": 6
}
*/

export default function PromptsProvider(props) {
  const { user, tokens } = useAuth();
  const { data: prompts = [], mutate } = useSWR(
    [apiUrl, tokens],
    fetchPrompts,
    { refreshInterval: 1000 }
  );
  const [outputs, setOutputs] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  async function fetchPrompts() {
    try {
      if (!tokens) {
        throw new Error('No auth tokens found');
      }
      const response = await fetch(apiUrl, config());
      const responseJSON = await response.json();
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
      const promptFromBackend = await fetch(apiUrl, options).then(
        (res) => res.json()
      );

      const responsesFromBackend = await fetch(
        `${apiUrl}${promptFromBackend.id}/responses/`,
        config()
      ).then((res) => res.json());
      setOutputs(responsesFromBackend);
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
      const options = {
        ...config(),
        method: 'DELETE',
      };
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
        setIsDirty,
        createPrompt,
        deletePrompt,
      }}
    >
      {props.children}
    </PromptsContext.Provider>
  );
}
