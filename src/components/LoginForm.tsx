import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/Auth';
import { LoginData } from '../types/auth.types';
import { loginSchema } from '../utils/validations/schemas';
import { PasswordInput } from './shared/PasswordInput';

interface LoginFormProps {
  switchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister }) => {
  const { login, isLoading, error } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginData) => {
    await login(data.email, data.password);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              id="email"
              type="email"
              className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
              {...register('email')}
            />
            {errors.email && <span className="text-error">{errors.email.message}</span>}
          </div>
          
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            register={register}
            errors={errors}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
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
