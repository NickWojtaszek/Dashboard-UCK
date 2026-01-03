import React from 'react';
import { Application } from '../types';
import AppListItem from './AppListItem';
import './AppList.css';

interface AppListProps {
  applications: Application[];
  onLaunchApp: (url: string) => void;
}

const AppList: React.FC<AppListProps> = ({ applications, onLaunchApp }) => {
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
    <div className="app-list">
      <div className="app-list-header">
        <div className="list-col col-name">Name</div>
        <div className="list-col col-type">Type</div>
        <div className="list-col col-version">Version</div>
        <div className="list-col col-status">Status</div>
        <div className="list-col col-actions">Actions</div>
      </div>

      <div className="app-list-body">
        {applications.map(app => (
          <AppListItem
            key={app.id}
            application={app}
            onLaunch={onLaunchApp}
          />
        ))}
      </div>
    </div>
  );
};

export default AppList;
