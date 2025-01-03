import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { LoginData } from '../../types/auth.types';

interface PasswordInputProps {
  id: string;
  name: keyof LoginData;
  label: string;
  register: UseFormRegister<LoginData>;
  errors: FieldErrors<LoginData>;
  validation?: object;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  label,
  register,
  errors,
  validation
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="form-control">
      <label htmlFor={id} className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`input input-bordered w-full ${errors[name] ? 'input-error' : ''}`}
          {...register(name, validation)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      {errors[name] && <span className="text-error">{errors[name]?.message?.toString()}</span>}
    </div>
  );
};