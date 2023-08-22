import useSWR from 'swr';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/model_match_app/`;

import { useAuth } from '@/contexts/auth';
import { useState } from 'react';

export default function useModels() {
  const { tokens } = useAuth();
  const { data = [], error } = useSWR([apiUrl, tokens], fetchModels);
  const [selectedModels, setSelectedModels] = useState([]);

  async function fetchModels() {
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
    console.error(`fetchModels: ${err}`);
  }

  function config() {
    return {
      headers: {
        Authorization: 'Bearer ' + tokens.access,
        'Content-Type': 'application/json',
      },
    };
  }

  function toggleModelActive(modelCode) {
    console.log({ modelCode, data, selectedModels });
    setSelectedModels((prevSelected) =>
      prevSelected.some((m) => m === modelCode)
        ? prevSelected.filter((m) => m !== modelCode)
        : [...prevSelected, modelCode]
    );
  }

  return {
    models: data,
    selectedModels,
    error,
    loading: tokens && !error && !data,
    toggleModelActive,
  };
}