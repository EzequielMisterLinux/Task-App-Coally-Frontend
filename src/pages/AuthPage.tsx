import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      {isLogin ? (
        <LoginForm
          switchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          switchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};
