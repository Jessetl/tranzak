import React from 'react';
import type { AuthContextType } from '@/domain/entities/Auth';

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);
