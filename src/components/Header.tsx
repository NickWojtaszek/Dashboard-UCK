import React from 'react';
import { LayoutGrid, List, Settings, Menu } from 'lucide-react';
import { ViewMode } from '../types';
import './Header.css';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onSettingsClick: () => void;
  onHamburgerClick?: () => void;
  isLoading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ viewMode, onViewModeChange, onSettingsClick, onHamburgerClick, isLoading }) => {
  return (
    <header className={`header ${isLoading ? 'loading' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <button
            className="hamburger-btn"
            onClick={onHamburgerClick}
            title="Toggle Menu"
          >
            <Menu size={24} />
          </button>
          <div className="logo">
            <div className="logo-icon">A</div>
            <h1 className="logo-text">Aura</h1>
          </div>
        </div>

        <div className="header-right">
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>

          <button
            className="settings-btn"
            onClick={onSettingsClick}
            title="Settings"
          >
            <Settings size={18} />
          </button>

          <div className="user-info">
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
