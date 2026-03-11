import React, { useEffect, useState } from 'react';
import { AuthContext } from '@/presentation/contexts/AuthContext';
import type { AuthUser, LoginCredentials } from '@/domain/entities/Auth';
import type { AuthRepository } from '@/core/contracts/AuthRepository';
import { LocalStorageAuthRepository } from '@/infrastructure/repositories/LocalStorageAuthRepository';

interface AuthProviderProps {
  children: React.ReactNode;
  authRepository?: AuthRepository;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authRepository = new LocalStorageAuthRepository(),
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const authenticatedUser = authRepository.getAuthenticatedUser();
    setUser(authenticatedUser);
  }, [authRepository]);

  const login = (credentials: LoginCredentials): boolean => {
    const authenticatedUser = authRepository.signIn(credentials);

    if (!authenticatedUser) {
      return false;
    }

    setUser(authenticatedUser);
    return true;
  };

  const logout = (): void => {
    authRepository.signOut();
    setUser(null);
  };

  const contextValue = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
