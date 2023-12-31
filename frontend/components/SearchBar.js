import { useModels } from '@/contexts/models';
import { usePrompts } from '@/contexts/prompts';
import { useSearch } from '@/contexts/search';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

export default function SearchBar(props) {
  const { selectedModels } = useModels();

  const { searchText, setSearchText } = useSearch();
  const { createPrompt, setIsDirty } = usePrompts();

  function handleSubmit() {
    createPrompt({ input_str: searchText, lang_models: selectedModels });
  }

  function handleInput(e) {
    setIsDirty(false);
    setSearchText(e.target.value);
  }
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormGroup className="max-w-lg gap-1 mx-auto my-2">
        <Label for="prompt">Enter your prompt</Label>
        <Input
          value={searchText}
          onChange={handleInput}
          type="textarea"
          // type="text"
          name="prompt"
          id="prompt"
          rows={5}
          autoFocus
          className="resize-y"
        />
        {props.children}
        <Button
          color="primary"
          className="w-full my-2"
          onClick={handleSubmit}
          type="button"
          disabled={!selectedModels.length}
        >
          Search
        </Button>
      </FormGroup>
    </Form>
  );
}
