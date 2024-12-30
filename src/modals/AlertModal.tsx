import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'info';
  message: string;
}

const icons = {
  success: <CheckCircle className="w-24 h-24 text-success" />,
  error: <XCircle className="w-24 h-24 text-error" />,
  info: <AlertCircle className="w-24 h-24 text-info" />
};

const titles = {
  success: 'Success!',
  error: 'Error!',
  info: 'Information'
};

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, type, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button 
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-4">
          {icons[type]}
          <h3 className="font-bold text-lg">{titles[type]}</h3>
          <p className="text-center">{message}</p>
          <div className="modal-action">
            <button onClick={onClose} className="btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};
