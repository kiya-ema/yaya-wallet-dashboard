import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by sender, receiver, cause or ID..."
        className="input"
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      {searchTerm && (
        <button
          type="button"
          onClick={() => {
            onSearchChange('');
            onSearch();
          }}
          className="btn btn-secondary"
        >
          Clear
        </button>
      )}
    </form>
  );
};
