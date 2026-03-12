import type { ThemeMode } from '@/domain/entities/Theme';
import type { ThemeRepository } from '@/domain/contracts/ThemeRepository';

export class LocalStorageThemeRepository implements ThemeRepository {
  private readonly STORAGE_KEY = 'app_theme_mode';

  getThemeMode(): ThemeMode | null {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const validModes: ThemeMode[] = ['light', 'dark'];

    return saved && validModes.includes(saved as ThemeMode)
      ? (saved as ThemeMode)
      : null;
  }

  setThemeMode(mode: ThemeMode): void {
    localStorage.setItem(this.STORAGE_KEY, mode);
  }

  clearThemeMode(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
