// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/Auth';

interface LoginFormProps {
  switchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  switchToRegister,
}) => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="card w-full max-w-sm shadow-xl bg-base-100">
      <div className="card-body">
        <h2 className="text-center text-2xl font-bold text-primary">
          Sign in to your account
        </h2>

        {error && (
          <div className="alert alert-error shadow-lg">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={switchToRegister}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

