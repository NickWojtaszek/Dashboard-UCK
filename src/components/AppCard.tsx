import React from 'react';
import { ExternalLink, Download, Check } from 'lucide-react';
import { Application } from '../types';
import './AppCard.css';

interface AppCardProps {
  application: Application;
  onLaunch: (url: string) => void;
}

const AppCard: React.FC<AppCardProps> = ({ application, onLaunch }) => {
  const { name, description, color, version, url } = application;
  // Ensure installed defaults to true if undefined (backward compatibility)
  const installed = application.installed !== false;

  return (
    <div className="app-card">
      <div
        className="app-card-header"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}
      >
        <div className="app-card-icon">
          {name.charAt(0)}
        </div>
      </div>

      <div className="app-card-body">
        <div className="app-card-title-row">
          <h3 className="app-card-title">{name}</h3>
          {installed && (
            <div className="installed-badge">
              <Check size={12} />
            </div>
          )}
        </div>

        <p className="app-card-description">{description}</p>

        {version && (
          <div className="app-card-version">v{version}</div>
        )}
      </div>

      <div className="app-card-footer">
        {installed ? (
          <button
            className="app-card-btn launch-btn"
            onClick={() => onLaunch(url || '')}
            disabled={!url}
            title={!url ? 'URL not configured' : 'Launch app'}
          >
            <ExternalLink size={16} />
            Launch
          </button>
        ) : (
          <button className="app-card-btn install-btn">
            <Download size={16} />
            Install
          </button>
        )}
      </div>
    </div>
  );
};

export default AppCard;
