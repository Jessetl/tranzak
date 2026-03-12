import type { AuthRepository } from '@/domain/contracts/AuthRepository';
import type { AuthUser, LoginCredentials } from '@/domain/entities/Auth';

export class LocalStorageAuthRepository implements AuthRepository {
  private readonly STORAGE_KEY = 'app_authenticated_user';

  private readonly demoCredentials = {
    email: 'demo@budget.com',
    password: '123456',
  } as const;

  getAuthenticatedUser(): AuthUser | null {
    const email = localStorage.getItem(this.STORAGE_KEY);

    if (!email || !email.includes('@')) {
      return null;
    }

    return { email };
  }

  signIn(credentials: LoginCredentials): AuthUser | null {
    const normalizedEmail = credentials.email.trim().toLowerCase();
    const normalizedPassword = credentials.password.trim();
    const isValidCredential =
      normalizedEmail === this.demoCredentials.email &&
      normalizedPassword === this.demoCredentials.password;

    if (!isValidCredential) {
      return null;
    }

    const user = { email: this.demoCredentials.email };
    localStorage.setItem(this.STORAGE_KEY, user.email);

    return user;
  }

  signOut(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
