import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import ModelList from '@/components/ModelList';
import Responses from '@/components/Responses';
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
  },
  {
    model: 'DeioshaBot',
    code: 'deiosha_code',
  },
];

export default function Search() {
  const [models, setModels] = useState([]);
  // const [selectedModels, setSelectedModels] = useState({});

  function toggleModel(model) {
    setModels(
      models.map((m) =>
        m.code === model.code ? { ...m, active: !m.active } : m
      )
    );
  }

  useEffect(() => {
    console.log(models);
    const mappedModels = MOCK_DATA.map((model) => ({
      ...model,
      loading: false,
      active: false,
    }));
    setModels(mappedModels);
  }, []);
  console.log(models);
  return (
    <>
      <Header />
      <SearchBar />
      <div className="flex">
        <ModelList models={models} toggleModel={toggleModel} />
        <Responses />
      </div>
    </>
  );
}
