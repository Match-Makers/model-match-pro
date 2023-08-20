import useSWR from 'swr';

export const apiUrl = process.env.NEXT_PUBLIC_RESOURCE_URL;
import { useAuth } from '@/contexts/auth';
import { useEffect, useState } from 'react';

const MOCK_DATA = [
  {
    model: 'Bard',
    code: 'bard_code',
  },
  {
    model: 'GPT',
    code: 'gpt_code',
  },
  {
    model: 'JerryBot',
    code: 'jerry_code',
    id: 'jerry_code',
  },
  {
    model: 'DeioshaBot',
    code: 'deiosha_code',
  },
];

export default function useModels() {
  const { tokens } = useAuth();
  const { data: apiData = [], error } = useSWR([apiUrl, tokens], fetchModels);
  //   TEMP
  console.warn('API Data:', apiData);
  const data = MOCK_DATA;
  //
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
