import React from 'react';
import { Application } from '../types';
import AppCard from './AppCard';
import './AppGrid.css';

interface AppGridProps {
  applications: Application[];
  onLaunchApp: (url: string) => void;
}

const AppGrid: React.FC<AppGridProps> = ({ applications, onLaunchApp }) => {
  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No applications found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="app-grid">
      {applications.map(app => (
        <AppCard
          key={app.id}
          application={app}
          onLaunch={onLaunchApp}
        />
      ))}
    </div>
  );
};

export default AppGrid;
