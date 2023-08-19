export default function SearchBar() {
  return (
    <div className="flex flex-col max-w-2xl max-h-screen mx-auto">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your prompt"
        />
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
