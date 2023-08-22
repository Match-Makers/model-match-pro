// import useModels from '@/hooks/useModels';
// import usePrompts from '@/hooks/usePrompts';
import { useState } from 'react';

export default function SearchBar() {
  // const { selectedModels } = useModels();

  const [text, setText] = useState('');
  // const {createPrompt} = usePrompts();

  return (
    <div className="flex flex-col max-w-2xl max-h-screen mx-auto my-4">
      <div className="input-group">
        <input
          value={text}
          onChange={(val) => setText(val)}
          type="text"
          className="form-control"
          placeholder="Enter your prompt"
        />
        <div className="input-group-append">
          <button className="btn btn-secondary" type="button">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
