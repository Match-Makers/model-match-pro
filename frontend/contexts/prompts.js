import useSWR from 'swr';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/model_match_app/prompts/`;

import { useAuth } from '@/contexts/auth';
import { createContext, useContext } from 'react';

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
      const options = {
        ...config(),
        method: 'POST',
        body: JSON.stringify({
          ...info,
          user_id: user.id,
        }),
      };
      console.log('createPrompt', { info, options });
      await fetch(apiUrl, options);
      // mutate(); // mutate causes complete collection to be refetched
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
        error,
        loading: tokens && !error && !prompts,
        createPrompt,
      }}
    >
      {props.children}
    </PromptsContext.Provider>
  );
}
