import React, { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '@/presentation/contexts/ThemeContext';
import type { ThemeMode } from '@/domain/entities/Theme';
import type { ThemeRepository } from '@/core/contracts/ThemeRepository';
import { LocalStorageThemeRepository } from '@/infrastructure/repositories/LocalStorageThemeRepository';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  themeRepository?: ThemeRepository;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  themeRepository,
}) => {
  const repository = useMemo<ThemeRepository>(
    () => themeRepository ?? new LocalStorageThemeRepository(),
    [themeRepository],
  );

  const [theme, setTheme] = useState<ThemeMode>(
    () => repository.getThemeMode() ?? defaultTheme,
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    const isDark = theme === 'dark';

    root.classList.toggle('dark', isDark);
    body.classList.toggle('dark', isDark);

    repository.setThemeMode(theme);
  }, [theme, repository]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const contextValue = {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
