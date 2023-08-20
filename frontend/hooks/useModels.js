import useSWR from 'swr';

export const apiUrl = process.env.NEXT_PUBLIC_RESOURCE_URL;
import { useAuth } from '@/contexts/auth';
import { useEffect, useState } from 'react';

export default function useModels() {
  const { tokens, logout } = useAuth();
  const { data = [], error } = useSWR([apiUrl, tokens], fetchModels);
  const [mappedModels, setMappedModels] = useState(data);
  console.log({ tokens, data, mappedModels });
  // useEffect(() => {
  //   setMappedModels(
  //     data.map((model) => ({
  //       ...model,
  //       loading: false,
  //       active: false,
  //     }))
  //   );
  // }, [data, mappedModels]);

  async function fetchModels() {
    // if (!tokens) {
    //   return;
    // }
    // try {
    //   const response = await fetch(apiUrl, config());
    //   const responseJSON = await response.json();
    //   return responseJSON;
    // } catch (err) {
    //   handleError(err);
    // }
  }

  function handleError(err) {
    console.error(err);
    logout();
  }

  function config() {
    return {
      headers: {
        Authorization: 'Bearer ' + tokens.access,
        'Content-Type': 'application/json',
      },
    };
  }

  function toggleModelActive(model) {
    setModels(
      models.map((m) =>
        m.code === model.code ? { ...m, active: !m.active } : m
      )
    );
  }

  return {
    models: data,
    error,
    loading: tokens && !error && !data,
    toggleModelActive,
  };
}
