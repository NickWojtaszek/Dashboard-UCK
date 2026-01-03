import React, { useState } from 'react';
import { X } from 'lucide-react';
import './PinModal.css';

interface PinModalProps {
  onClose: () => void;
  onSuccess: () => void;
  correctPin: string;
}

const PinModal: React.FC<PinModalProps> = ({ onClose, onSuccess, correctPin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pin === correctPin) {
      onSuccess();
      onClose();
    } else {
      setError('Incorrect PIN');
      setPin('');
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
    setError('');
  };

  return (
    <div className="pin-modal-overlay" onClick={onClose}>
      <div className="pin-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pin-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="pin-modal-header">
          <h2>Admin Access</h2>
          <p>Enter your PIN to access settings</p>
        </div>

        <form onSubmit={handleSubmit} className="pin-modal-form">
          <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            placeholder="Enter PIN"
            className={`pin-input ${error ? 'error' : ''}`}
            autoFocus
            maxLength={6}
          />

          {error && <p className="pin-error">{error}</p>}

          <div className="pin-modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={!pin}>
              Unlock
            </button>
          </div>
        </form>

        <div className="pin-hint">
          <small>Default PIN: 1234</small>
        </div>
      </div>
    </div>
  );
};

export default PinModal;
