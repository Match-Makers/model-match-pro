export default function SearchBar() {
  return (
    <div className="flex flex-col max-w-2xl max-h-screen mx-auto my-4">
      <div className="input-group">
        <input
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
