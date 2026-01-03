import React from 'react';
import { ApplicationType, Category } from '../types';
import './FilterPanel.css';

interface FilterPanelProps {
  categories: Category[];
  selectedTypes: ApplicationType[];
  onFilterChange: (types: ApplicationType[]) => void;
  onFilterSelect?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ categories, selectedTypes, onFilterChange, onFilterSelect }) => {
  const toggleType = (type: ApplicationType) => {
    if (selectedTypes.includes(type)) {
      onFilterChange(selectedTypes.filter(t => t !== type));
    } else {
      onFilterChange([...selectedTypes, type]);
    }
    onFilterSelect?.();
  };

  const clearFilters = () => {
    onFilterChange([]);
    onFilterSelect?.();
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Categories</h3>
        {selectedTypes.length > 0 && (
          <button className="clear-filters" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>

      <div className="filter-list">
        {categories.map(({ type, label }) => (
          <button
            key={type}
            className={`filter-item ${selectedTypes.includes(type) ? 'active' : ''}`}
            onClick={() => toggleType(type)}
          >
            <span className="filter-label">{label}</span>
            {selectedTypes.includes(type) && (
              <span className="filter-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
