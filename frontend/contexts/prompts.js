import useSWR from 'swr';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/model_match_app/prompts/`;

import { useAuth } from '@/contexts/auth';
import { createContext, useContext, useState } from 'react';

export const PromptsContext = createContext({
  prompts: [],
  error: null,
  loading: false,
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
  const { prompts = [], error } = useSWR([apiUrl, tokens], fetchPrompts);
  const [outputs, setOutputs] = useState([]);

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
      setOutputs([]);
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
      console.warn({ promptFromBackend });
      /** Example res:
       * [{
        "id": 149,
        "response": "bugbubh, and the\nother, the _Bubh_, or _Bub_, or",
        "prompt_id": 312,
        "lang_model_id": 79
        }]
       */
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
    }
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

  return (
    <PromptsContext.Provider
      value={{
        prompts,
        outputs,
        error,
        loading: tokens && !error && !prompts,
        createPrompt,
      }}
    >
      {props.children}
    </PromptsContext.Provider>
  );
}
