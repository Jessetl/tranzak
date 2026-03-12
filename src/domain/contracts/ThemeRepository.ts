import type { ThemeMode } from '@/domain/entities/Theme';

export interface ThemeRepository {
  getThemeMode: () => ThemeMode | null;
  setThemeMode: (mode: ThemeMode) => void;
  clearThemeMode: () => void;
}
