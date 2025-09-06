import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  specialId: string;
}

interface AuthContextType {
  user: User | null;
  authPage: 'login' | 'signup' | 'forgot-password';
  login: (email: string, password: string, name?: string) => void;
  logout: () => void;
  setAuthPage: (page: 'login' | 'signup' | 'forgot-password') => void;
  resetPassword: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authPage, setAuthPage] = useState<'login' | 'signup' | 'forgot-password'>('login');

  const generateSpecialId = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const login = (email: string, password: string, name?: string) => {
    // Simulate login - in real app, this would be an API call
    const userData = {
      id: Math.random().toString(36).substring(2, 15),
      name: name || email.split('@')[0],
      email,
      specialId: generateSpecialId()
    };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setAuthPage('login');
  };

  const resetPassword = (email: string) => {
    console.log('Password reset requested for:', email);
    // In real app, this would trigger password reset email
    setAuthPage('login');
  };

  const value = {
    user,
    authPage,
    login,
    logout,
    setAuthPage,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};