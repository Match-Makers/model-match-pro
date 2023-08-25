import { useModels } from '@/contexts/models';
import { usePrompts } from '@/contexts/prompts';
import { useSearch } from '@/contexts/search';

export default function SearchBar() {
  const { selectedModels } = useModels();

  const { searchText, setSearchText } = useSearch();
  const { createPrompt } = usePrompts();

  function handleSubmit() {
    createPrompt({ input_str: searchText, lang_models: selectedModels });
  }
  return (
    <div className="flex flex-col max-w-2xl max-h-screen mx-auto my-4">
      <div className="input-group">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter your prompt"
        />
        <div className="input-group-append">
          <button
            className="btn btn-secondary"
            onClick={handleSubmit}
            type="button"
            disabled={!selectedModels.length}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
