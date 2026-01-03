import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { applications as defaultApplications } from './data/applications';
import { Application, ApplicationType, ViewMode, FilterOptions, Category } from './types';
import { dataService } from './services/dataService';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import AppGrid from './components/AppGrid';
import AppList from './components/AppList';
import PinModal from './components/PinModal';
import SettingsPanel from './components/SettingsPanel';
import DataSyncStatus from './components/DataSyncStatus';

const DEFAULT_PIN = '1234';

const defaultCategories: Category[] = [
  { type: 'productivity', label: 'Productivity' },
  { type: 'development', label: 'Development' },
  { type: 'design', label: 'Design' },
  { type: 'communication', label: 'Communication' },
  { type: 'media', label: 'Media' },
  { type: 'utility', label: 'Utility' },
  { type: 'database', label: 'Database' },
  { type: 'analytics', label: 'Analytics' }
];

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: '',
    selectedTypes: []
  });

  // Data loading states
  const [applications, setApplications] = useState<Application[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [adminPin, setAdminPin] = useState(DEFAULT_PIN);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  const [showPinModal, setShowPinModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setDataError(null);

        const [loadedApps, loadedCategories, loadedPin] = await Promise.all([
          dataService.loadApplications(),
          dataService.loadCategories(),
          dataService.loadPin(),
        ]);

        // Use loaded data or fallback to defaults
        setApplications(loadedApps.length > 0 ? loadedApps : defaultApplications);
        setCategories(loadedCategories.length > 0 ? loadedCategories : defaultCategories);
        setAdminPin(loadedPin || DEFAULT_PIN);
      } catch (error) {
        console.error('Error loading data:', error);
        setDataError('Failed to load data');
        // Still set defaults so app is usable
        setApplications(defaultApplications);
        setCategories(defaultCategories);
        setAdminPin(DEFAULT_PIN);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save applications via dataService whenever they change
  useEffect(() => {
    if (!isLoading) {
      dataService.saveApplications(applications).catch(error => {
        console.error('Error saving applications:', error);
        setDataError('Failed to save applications');
      });
    }
  }, [applications, isLoading]);

  // Save categories via dataService whenever they change
  useEffect(() => {
    if (!isLoading) {
      dataService.saveCategories(categories).catch(error => {
        console.error('Error saving categories:', error);
        setDataError('Failed to save categories');
      });
    }
  }, [categories, isLoading]);

  // Save PIN via dataService whenever it changes
  useEffect(() => {
    if (!isLoading) {
      dataService.savePin(adminPin).catch(error => {
        console.error('Error saving PIN:', error);
        setDataError('Failed to save PIN');
      });
    }
  }, [adminPin, isLoading]);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(filterOptions.searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(filterOptions.searchQuery.toLowerCase());

      const matchesType = filterOptions.selectedTypes.length === 0 ||
        filterOptions.selectedTypes.includes(app.type);

      return matchesSearch && matchesType;
    });
  }, [applications, filterOptions]);

  const handleSearch = (query: string) => {
    setFilterOptions(prev => ({ ...prev, searchQuery: query }));
  };

  const handleTypeFilter = (types: ApplicationType[]) => {
    setFilterOptions(prev => ({ ...prev, selectedTypes: types }));
  };

  const handleLaunchApp = (url: string) => {
    window.open(url, '_blank');
  };

  const handleSettingsClick = () => {
    setShowPinModal(true);
  };

  const handlePinSuccess = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleSaveApps = (updatedApps: Application[]) => {
    setApplications(updatedApps);
  };

  const handleSaveCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
  };

  const handleUpdatePin = (newPin: string) => {
    setAdminPin(newPin);
  };

  return (
    <div className="app">
      {dataError && (
        <div className="data-error-banner">
          ⚠ {dataError}
          <button onClick={() => setDataError(null)}>Dismiss</button>
        </div>
      )}
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSettingsClick={handleSettingsClick}
        onHamburgerClick={() => setSidebarOpen(!sidebarOpen)}
        isLoading={isLoading}
      />

      <div className="app-container">
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
          <DataSyncStatus isLoading={isLoading} error={dataError} />
          <SearchBar onSearch={handleSearch} />
          <FilterPanel
            categories={categories}
            selectedTypes={filterOptions.selectedTypes}
            onFilterChange={handleTypeFilter}
            onFilterSelect={() => setSidebarOpen(false)}
          />
        </aside>

        <main className="main-content">
          <div className="content-header">
            <h2>Applications</h2>
            <span className="app-count">
              {filteredApplications.length} {filteredApplications.length === 1 ? 'app' : 'apps'}
            </span>
          </div>

          {viewMode === 'grid' ? (
            <AppGrid
              applications={filteredApplications}
              onLaunchApp={handleLaunchApp}
            />
          ) : (
            <AppList
              applications={filteredApplications}
              onLaunchApp={handleLaunchApp}
            />
          )}
        </main>
      </div>

      {showPinModal && (
        <PinModal
          onClose={() => setShowPinModal(false)}
          onSuccess={handlePinSuccess}
          correctPin={adminPin}
        />
      )}

      {showSettings && (
        <SettingsPanel
          applications={applications}
          categories={categories}
          onClose={handleCloseSettings}
          onSaveApps={handleSaveApps}
          onSaveCategories={handleSaveCategories}
          onUpdatePin={handleUpdatePin}
          currentPin={adminPin}
        />
      )}
    </div>
  );
}

export default App;
