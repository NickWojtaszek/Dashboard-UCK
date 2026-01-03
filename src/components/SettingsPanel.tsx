import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, Settings as SettingsIcon } from 'lucide-react';
import { Application, Category } from '../types';
import AppForm from './AppForm';
import CategoryManager from './CategoryManager';
import './SettingsPanel.css';

interface SettingsPanelProps {
  applications: Application[];
  categories: Category[];
  onClose: () => void;
  onSaveApps: (apps: Application[]) => void;
  onSaveCategories: (categories: Category[]) => void;
  onUpdatePin: (newPin: string) => void;
  currentPin: string;
}

type TabType = 'apps' | 'categories' | 'security';

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  applications,
  categories,
  onClose,
  onSaveApps,
  onSaveCategories,
  onUpdatePin,
  currentPin
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('apps');
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [appFormError, setAppFormError] = useState('');
  const [appFormSuccess, setAppFormSuccess] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');

  const handleSaveApp = (app: Application) => {
    // Clear previous messages
    setAppFormError('');
    setAppFormSuccess('');

    // Validate app data
    if (!app.name?.trim() || !app.url?.trim() || !app.description?.trim()) {
      setAppFormError('Please fill in all required fields');
      return;
    }

    // Validate URL format
    try {
      new URL(app.url);
    } catch {
      setAppFormError('Invalid URL format');
      return;
    }

    try {
      // Ensure installed field is always a boolean
      const appToSave: Application = {
        ...app,
        installed: Boolean(app.installed)
      };

      // Perform save
      if (editingApp) {
        const updated = applications.map(a => a.id === appToSave.id ? appToSave : a);
        onSaveApps(updated);
      } else {
        onSaveApps([...applications, appToSave]);
      }

      // Show success feedback briefly then close
      const action = editingApp ? 'updated' : 'added';
      setAppFormSuccess(`App ${action} successfully!`);

      // Close form immediately after showing success
      // Using requestAnimationFrame ensures state updates are processed
      requestAnimationFrame(() => {
        setTimeout(() => {
          setEditingApp(null);
          setIsAddingApp(false);
          setAppFormSuccess('');
          setAppFormError('');
        }, 300);
      });

    } catch (error) {
      console.error('Error saving app:', error);
      setAppFormError('Failed to save app. Please try again.');
    }
  };

  const handleDeleteApp = (id: string) => {
    if (window.confirm('Are you sure you want to delete this app?')) {
      try {
        const updated = applications.filter(app => app.id !== id);
        onSaveApps(updated);
      } catch (error) {
        console.error('Error deleting app:', error);
        alert('Failed to delete app. Please try again.');
      }
    }
  };

  const handleEditApp = (app: Application) => {
    setEditingApp(app);
    setIsAddingApp(true);
    setAppFormError('');
    setAppFormSuccess('');
  };

  const handleUpdatePin = () => {
    if (newPin.length < 4) {
      setPinError('PIN must be at least 4 characters');
      return;
    }
    if (newPin !== confirmPin) {
      setPinError('PINs do not match');
      return;
    }
    onUpdatePin(newPin);
    setNewPin('');
    setConfirmPin('');
    setPinError('');
    alert('PIN updated successfully!');
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <div className="settings-title">
            <SettingsIcon size={24} />
            <h2>Settings</h2>
          </div>
          <button className="settings-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === 'apps' ? 'active' : ''}`}
            onClick={() => setActiveTab('apps')}
          >
            Applications
          </button>
          <button
            className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'apps' && (
            <div className="apps-section">
              {isAddingApp ? (
                <div className="app-form-container">
                  <h3>{editingApp ? 'Edit Application' : 'Add New Application'}</h3>
                  {appFormError && (
                    <div className="form-error-message">
                      {appFormError}
                    </div>
                  )}
                  {appFormSuccess && (
                    <div className="form-success-message">
                      {appFormSuccess}
                    </div>
                  )}
                  <AppForm
                    app={editingApp || undefined}
                    categories={categories.map(c => c.type)}
                    onSave={handleSaveApp}
                    onCancel={() => {
                      setIsAddingApp(false);
                      setEditingApp(null);
                      setAppFormError('');
                      setAppFormSuccess('');
                    }}
                  />
                </div>
              ) : (
                <>
                  <div className="section-header">
                    <h3>Manage Applications</h3>
                    <button className="btn-add" onClick={() => setIsAddingApp(true)}>
                      <Plus size={16} />
                      Add App
                    </button>
                  </div>

                  <div className="apps-list">
                    {applications.map(app => (
                      <div key={app.id} className="app-item">
                        <div
                          className="app-item-color"
                          style={{ backgroundColor: app.color }}
                        >
                          {app.name.charAt(0)}
                        </div>
                        <div className="app-item-info">
                          <h4>{app.name}</h4>
                          <p>{app.description}</p>
                          <div className="app-item-meta">
                            <span className="meta-tag">{app.type}</span>
                            {app.version && <span className="meta-tag">v{app.version}</span>}
                            <span className={`meta-tag ${app.installed ? 'installed' : ''}`}>
                              {app.installed ? 'Installed' : 'Not Installed'}
                            </span>
                          </div>
                        </div>
                        <div className="app-item-actions">
                          <button
                            className="btn-icon-action"
                            onClick={() => handleEditApp(app)}
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="btn-icon-action danger"
                            onClick={() => handleDeleteApp(app.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'categories' && (
            <CategoryManager
              categories={categories}
              onSave={onSaveCategories}
            />
          )}

          {activeTab === 'security' && (
            <div className="security-section">
              <h3>Change Admin PIN</h3>
              <p className="section-description">
                Update your admin PIN to secure the settings panel
              </p>

              <div className="pin-change-form">
                <div className="form-group">
                  <label>Current PIN</label>
                  <input
                    type="text"
                    value={currentPin}
                    disabled
                    className="pin-display"
                  />
                </div>

                <div className="form-group">
                  <label>New PIN</label>
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => {
                      setNewPin(e.target.value);
                      setPinError('');
                    }}
                    placeholder="Enter new PIN"
                    maxLength={6}
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New PIN</label>
                  <input
                    type="password"
                    value={confirmPin}
                    onChange={(e) => {
                      setConfirmPin(e.target.value);
                      setPinError('');
                    }}
                    placeholder="Confirm new PIN"
                    maxLength={6}
                  />
                </div>

                {pinError && <p className="pin-change-error">{pinError}</p>}

                <button
                  className="btn-update-pin"
                  onClick={handleUpdatePin}
                  disabled={!newPin || !confirmPin}
                >
                  Update PIN
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
