import useModels from '@/hooks/useModels';
import usePrompts from '@/hooks/usePrompts';
import { useState } from 'react';

export default function SearchBar() {
  const { selectedModels } = useModels();
  console.warn('SearchBar:useModels', [...selectedModels]);

  const [text, setText] = useState('');
  const { createPrompt } = usePrompts();

  function handleSubmit() {
    console.log(selectedModels, 'I am selected models');
    createPrompt({ input_str: text, lang_models: selectedModels });
  }
  return (
    <div className="flex flex-col max-w-2xl max-h-screen mx-auto my-4">
      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter your prompt"
        />
        <div className="input-group-append">
          <button
            className="btn btn-secondary"
            onClick={handleSubmit}
            type="button"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
