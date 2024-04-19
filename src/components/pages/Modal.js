import React from 'react';

function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '50%', backgroundColor: 'white', padding: 20, boxSizing: 'border-box', borderRadius: 10 }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>Close</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
