import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-control">
      <label htmlFor={id} className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      {error && <span className="text-error">{error}</span>}
    </div>
  );
};