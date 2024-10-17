import React, { useState, useEffect } from 'react';
import './ToastNotification.css';

const ToastNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification">
      {message}
    </div>
  );
};

export default ToastNotification;
