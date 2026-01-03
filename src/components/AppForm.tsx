import React, { useState } from 'react';
import { Application, ApplicationType } from '../types';
import './AppForm.css';

interface AppFormProps {
  app?: Application;
  categories: ApplicationType[];
  onSave: (app: Application) => void;
  onCancel: () => void;
}

const AppForm: React.FC<AppFormProps> = ({ app, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Application>({
    id: app?.id || Date.now().toString(),
    name: app?.name || '',
    description: app?.description || '',
    type: app?.type || 'productivity',
    url: app?.url || '',
    color: app?.color || '#6366f1',
    installed: Boolean(app?.installed ?? true),  // Explicitly convert to boolean
    version: app?.version || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof Application, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="app-name">
            App Name <span className="required">*</span>
          </label>
          <input
            id="app-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. GitHub"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="app-url">
            URL <span className="required">*</span>
          </label>
          <input
            id="app-url"
            type="text"
            value={formData.url}
            onChange={(e) => handleChange('url', e.target.value)}
            placeholder="e.g. https://github.com"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="app-description">
          Description <span className="required">*</span>
        </label>
        <textarea
          id="app-description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Short description of the app"
          rows={3}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="app-category">
            Category <span className="required">*</span>
          </label>
          <select
            id="app-category"
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value as ApplicationType)}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="app-color">
            Color <span className="required">*</span>
          </label>
          <div className="color-input-group">
            <input
              id="app-color"
              type="color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
            />
            <input
              type="text"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              placeholder="#6366f1"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="app-version">Version</label>
          <input
            id="app-version"
            type="text"
            value={formData.version}
            onChange={(e) => handleChange('version', e.target.value)}
            placeholder="e.g. 1.0.0"
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.installed}
              onChange={(e) => handleChange('installed', e.target.checked)}
            />
            <span>Installed</span>
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {app ? 'Update App' : 'Add App'}
        </button>
      </div>
    </form>
  );
};

export default AppForm;
