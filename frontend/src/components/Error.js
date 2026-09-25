import React, { useState } from 'react';
import './Error.css';
import { X } from 'lucide-react';

function Error({ message }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="error-banner">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <p>{message}</p>
        <button
          className="error-close"
          onClick={() => setDismissed(true)}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default Error;
