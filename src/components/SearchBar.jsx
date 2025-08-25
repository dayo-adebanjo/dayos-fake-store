function SearchBar({ query, setQuery }) {
  return (
    <div className="search-bar-container">
      <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-bar"
    />
    </div>
  )
}

export default SearchBar;
