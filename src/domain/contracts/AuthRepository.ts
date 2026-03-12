import type { AuthUser, LoginCredentials } from '@/domain/entities/Auth';

export interface AuthRepository {
  getAuthenticatedUser: () => AuthUser | null;
  signIn: (credentials: LoginCredentials) => AuthUser | null;
  signOut: () => void;
}
