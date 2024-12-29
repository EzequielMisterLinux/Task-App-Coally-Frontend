// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/Auth';

interface RegisterFormProps {
  switchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  switchToLogin,
}) => {
  const { register, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    names: '',
    lastnames: '',
    age: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { age, ...rest } = formData;
    await register({ ...rest, age: parseInt(age, 10) });
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
              type="text"
              placeholder="Enter your names"
              className="input input-bordered"
              required
              value={formData.names}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="lastnames" className="label">
              <span className="label-text">User Lastnames</span>
            </label>
            <input
              id="lastnames"
              type="text"
              placeholder="Enter your lastnames"
              className="input input-bordered"
              required
              value={formData.lastnames}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="age" className="label">
              <span className="label-text">Your Age</span>
            </label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              className="input input-bordered"
              required
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
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
