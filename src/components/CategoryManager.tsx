import React, { useState } from 'react';
import { Category, ApplicationType } from '../types';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';
import './CategoryManager.css';

interface CategoryManagerProps {
  categories: Category[];
  onSave: (categories: Category[]) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onSave }) => {
  const [localCategories, setLocalCategories] = useState<Category[]>([...categories]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (index: number) => {
    setEditingId(localCategories[index].type);
  };

  const handleDelete = (index: number) => {
    const updated = localCategories.filter((_, i) => i !== index);
    setLocalCategories(updated);
  };

  const handleUpdate = (index: number, field: keyof Category, value: string) => {
    const updated = [...localCategories];
    updated[index] = { ...updated[index], [field]: value };
    setLocalCategories(updated);
  };

  const handleAddNew = () => {
    if (newCategory.type && newCategory.label) {
      setLocalCategories([...localCategories, newCategory as Category]);
      setNewCategory({});
      setIsAdding(false);
    }
  };

  const handleSave = () => {
    onSave(localCategories);
  };

  const handleCancel = () => {
    setLocalCategories([...categories]);
    setEditingId(null);
    setIsAdding(false);
    setNewCategory({});
  };

  return (
    <div className="category-manager">
      <div className="category-manager-header">
        <h3>Manage Categories</h3>
        <button
          className="btn-add-category"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="category-list">
        {localCategories.map((category, index) => (
          <div key={category.type} className="category-item">
            {editingId === category.type ? (
              <>
                <input
                  type="text"
                  value={category.label}
                  onChange={(e) => handleUpdate(index, 'label', e.target.value)}
                  className="category-label-input"
                  placeholder="Label"
                />
                <button
                  className="btn-icon success"
                  onClick={() => setEditingId(null)}
                  title="Save"
                >
                  <Save size={16} />
                </button>
              </>
            ) : (
              <>
                <span className="category-label">{category.label}</span>
                <span className="category-type">{category.type}</span>
                <div className="category-actions">
                  <button
                    className="btn-icon"
                    onClick={() => handleEdit(index)}
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn-icon danger"
                    onClick={() => handleDelete(index)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {isAdding && (
          <div className="category-item adding">
            <input
              type="text"
              value={newCategory.label || ''}
              onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
              className="category-label-input"
              placeholder="Label"
            />
            <input
              type="text"
              value={newCategory.type || ''}
              onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value as ApplicationType })}
              className="category-type-input"
              placeholder="type-name"
            />
            <button
              className="btn-icon success"
              onClick={handleAddNew}
              title="Add"
              disabled={!newCategory.type || !newCategory.label}
            >
              <Save size={16} />
            </button>
            <button
              className="btn-icon"
              onClick={() => {
                setIsAdding(false);
                setNewCategory({});
              }}
              title="Cancel"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="category-manager-actions">
        <button className="btn-secondary" onClick={handleCancel}>
          Reset
        </button>
        <button className="btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;
