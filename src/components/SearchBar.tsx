import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <Search className="search-icon" size={18} />
      <input
        type="text"
        placeholder="Search applications..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
