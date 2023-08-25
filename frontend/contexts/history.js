import useSWR from 'swr';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/model_match_app/responses/`;

import { useAuth } from '@/contexts/auth';
import { createContext, useContext } from 'react';

export const HistoryContext = createContext({
  history: [],
  error: false,
  loading: false,
  isDirty: false,
  createPrompt: () => undefined,
});

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('You forgot HistoryProvider!');
  }
  return context;
}

export default function HistoryProvider(props) {
  const { tokens } = useAuth();
  const {
    history = [],
    loading,
    error,
  } = useSWR([apiUrl, tokens], fetchHistory);

  async function fetchHistory() {
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

  function handleError(err) {
    console.error(`fetchHistory: ${err}`);
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
    <HistoryContext.Provider
      value={{
        history,
        error,
        loading,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
}
