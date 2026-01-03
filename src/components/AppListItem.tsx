import React from 'react';
import { ExternalLink, Download } from 'lucide-react';
import { Application } from '../types';
import './AppListItem.css';

interface AppListItemProps {
  application: Application;
  onLaunch: (url: string) => void;
}

const AppListItem: React.FC<AppListItemProps> = ({ application, onLaunch }) => {
  const { name, description, type, color, version, url } = application;
  // Ensure installed defaults to true if undefined (backward compatibility)
  const installed = application.installed !== false;

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="app-list-item">
      <div className="list-item-col col-name">
        <div
          className="app-list-icon"
          style={{ backgroundColor: color }}
        >
          {name.charAt(0)}
        </div>
        <div className="app-list-info">
          <h4 className="app-list-title">{name}</h4>
          <p className="app-list-description">{description}</p>
        </div>
      </div>

      <div className="list-item-col col-type">
        <span className="type-badge">{getTypeLabel(type)}</span>
      </div>

      <div className="list-item-col col-version">
        <span className="version-text">{version || 'N/A'}</span>
      </div>

      <div className="list-item-col col-status">
        {installed ? (
          <span className="status-badge installed">Installed</span>
        ) : (
          <span className="status-badge not-installed">Not Installed</span>
        )}
      </div>

      <div className="list-item-col col-actions">
        {installed ? (
          <button
            className="list-action-btn launch"
            onClick={() => onLaunch(url || '')}
            disabled={!url}
            title={!url ? 'URL not configured' : 'Launch app'}
          >
            <ExternalLink size={16} />
            Launch
          </button>
        ) : (
          <button className="list-action-btn install">
            <Download size={16} />
            Install
          </button>
        )}
      </div>
    </div>
  );
};

export default AppListItem;
