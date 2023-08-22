import useSWR from 'swr';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/model_match_app/prompts/`;

import { useAuth } from '@/contexts/auth';
import { useState } from 'react';

export default function useModels() {
  const { tokens } = useAuth();
  const { data = [], error } = useSWR([apiUrl, tokens], fetchPrompts);
  const [prompt, setPrompt] = useState([]);

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
        // body: JSON.stringify(info),
        body: JSON.stringify({
          ...info,
          input_str: info.query,
          api_code: ['gpt2'],
          user_id: 6,
        }),
      };
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

  return {
    models: data,
    prompt,
    error,
    loading: tokens && !error && !data,
    createPrompt,
  };
}
