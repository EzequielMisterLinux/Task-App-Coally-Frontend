import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/auth/Auth';
import type { RegisterData } from '../types/auth.types';
import { emailSchema, passwordSchema } from '../utils/validations/schemas';
import { PasswordInput } from './shared/PasswordInputRegister';

interface RegisterFormProps {
  switchToLogin: () => void;
}

interface FormData extends Partial<RegisterData> {
  confirmPassword?: string;
}

type ValidationErrors = Record<string, string>;

export const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
  const { register: registerUser, isLoading, error } = useAuth();
  const [formData, setFormData] = useState<FormData>({});
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const validateField = (name: keyof FormData, value: string | number | File | undefined): string => {
    if (value === undefined) return '';

    switch (name) {
      case 'names': {
        const val = String(value);
        return !val ? 'Names are required' :
          val.length < 2 ? 'Names should be at least 2 characters long' : '';
      }
      case 'lastnames': {
        const val = String(value);
        return !val ? 'Lastnames are required' :
          val.length < 2 ? 'Lastnames should be at least 2 characters long' : '';
      }
      case 'age': {
        const ageNum = Number(value);
        return !value ? 'Age is required' :
          ageNum < 18 ? 'You must be at least 18 years old' :
          ageNum > 120 ? 'Please enter a valid age' : '';
      }
      case 'email': {
        const val = String(value);
        return !val ? 'Email is required' :
          !emailSchema.safeParse(val).success ? 'Invalid email format' : '';
      }
      case 'password': {
        const val = String(value);
        return !val ? 'Password is required' :
          !passwordSchema.safeParse(val).success ? 
          'Password must be at least 8 characters and include a letter and number' : '';
      }
      case 'confirmPassword': {
        const val = String(value);
        return !val ? 'Please confirm your password' :
          val !== formData.password ? 'Passwords do not match' : '';
      }
      default:
        return '';
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files) {
      const file = files[0];
      if (file) {
        const maxSize = 5 * 1024 * 1024; 
        
        if (file.size > maxSize) {
          setValidationErrors(prev => ({
            ...prev,
            profileImage: 'Image size should be less than 5MB'
          }));
          return;
        }
        
        if (!file.type.startsWith('image/')) {
          setValidationErrors(prev => ({
            ...prev,
            profileImage: 'Please upload an image file'
          }));
          return;
        }

        setFormData(prev => ({ ...prev, profileImage: file }));
        setImagePreview(URL.createObjectURL(file));
        setValidationErrors(prev => ({ ...prev, profileImage: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      const error = validateField(name as keyof FormData, value);
      setValidationErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: ValidationErrors = {};
    (Object.entries(formData) as [keyof FormData, FormData[keyof FormData]][]).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const registrationData: RegisterData = {
        names: formData.names!,
        lastnames: formData.lastnames!,
        age: Number(formData.age),
        email: formData.email!,
        password: formData.password!,
        ...(formData.profileImage && { profileImage: formData.profileImage })
      };

      await registerUser(registrationData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="card w-full max-w-sm shadow-xl bg-base-100">
      <div className="card-body">
        <h2 className="text-center text-2xl font-bold text-primary">
          Create an account
        </h2>

        {error && (
          <div className="alert alert-error shadow-lg">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="form-control">
            <label htmlFor="names" className="label">
              <span className="label-text">User Names</span>
            </label>
            <input
              id="names"
              name="names"
              type="text"
              className={`input input-bordered ${validationErrors.names ? 'input-error' : ''}`}
              value={formData.names || ''}
              onChange={handleInputChange}
            />
            {validationErrors.names && (
              <span className="text-error">{validationErrors.names}</span>
            )}
          </div>


          <div className="form-control">
            <label htmlFor="lastnames" className="label">
              <span className="label-text">User Lastnames</span>
            </label>
            <input
              id="lastnames"
              name="lastnames"
              type="text"
              className={`input input-bordered ${validationErrors.lastnames ? 'input-error' : ''}`}
              value={formData.lastnames || ''}
              onChange={handleInputChange}
            />
            {validationErrors.lastnames && (
              <span className="text-error">{validationErrors.lastnames}</span>
            )}
          </div>


          <div className="form-control">
            <label htmlFor="age" className="label">
              <span className="label-text">Your Age</span>
            </label>
            <input
              id="age"
              name="age"
              type="number"
              className={`input input-bordered ${validationErrors.age ? 'input-error' : ''}`}
              value={formData.age || ''}
              onChange={handleInputChange}
            />
            {validationErrors.age && (
              <span className="text-error">{validationErrors.age}</span>
            )}
          </div>


          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`input input-bordered ${validationErrors.email ? 'input-error' : ''}`}
              value={formData.email || ''}
              onChange={handleInputChange}
            />
            {validationErrors.email && (
              <span className="text-error">{validationErrors.email}</span>
            )}
          </div>


          <PasswordInput
            id="password"
            name="password"
            label="Password"
            value={formData.password || ''}
            onChange={handleInputChange}
            error={validationErrors.password}
          />


          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword || ''}
            onChange={handleInputChange}
            error={validationErrors.confirmPassword}
          />

          <div className="form-control">
            <label htmlFor="profileImage" className="label">
              <span className="label-text">Profile Image</span>
            </label>
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              className={`file-input file-input-bordered ${
                validationErrors.profileImage ? 'input-error' : ''
              }`}
              accept="image/*"
              onChange={handleInputChange}
            />
            {validationErrors.profileImage && (
              <span className="text-error">{validationErrors.profileImage}</span>
            )}
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign up'}
          </button>
        </form>


        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={switchToLogin}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};