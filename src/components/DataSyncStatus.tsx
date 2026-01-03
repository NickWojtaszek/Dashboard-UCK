import React, { useEffect, useState } from 'react';
import { dataService } from '../services/dataService';
import './DataSyncStatus.css';

interface DataSyncStatusProps {
  isLoading: boolean;
  error?: string | null;
}

const DataSyncStatus: React.FC<DataSyncStatusProps> = ({ isLoading, error }) => {
  const [status, setStatus] = useState(() => dataService.getStatus());

  useEffect(() => {
    // Update status periodically
    const interval = setInterval(() => {
      setStatus(dataService.getStatus());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="sync-status loading">
        <span className="sync-spinner">⟳</span>
        <span>Loading data...</span>
      </div>
    );
  }

  if (error || status.error) {
    return (
      <div className="sync-status error">
        <span className="sync-icon">⚠</span>
        <span>{error || status.error}</span>
      </div>
    );
  }

  // Show Supabase sync status if configured
  if (status.usingSupabase) {
    if (!status.isOnline) {
      return (
        <div className="sync-status offline">
          <span className="sync-icon">📡</span>
          <span>Offline - using cached data</span>
        </div>
      );
    }

    return (
      <div className="sync-status synced">
        <span className="sync-icon">☁️</span>
        <span>Synced with cloud</span>
      </div>
    );
  }

  // Default: localStorage only
  return (
    <div className="sync-status local">
      <span className="sync-icon">💾</span>
      <span>Using local storage</span>
    </div>
  );
};

export default DataSyncStatus;
