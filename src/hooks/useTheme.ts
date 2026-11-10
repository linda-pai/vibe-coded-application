import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function writeStored(theme: Theme | null): void {
  try {
    if (theme) localStorage.setItem(STORAGE_KEY, theme);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode, blocked): the override lasts for this visit only.
  }
}

function systemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/**
 * The page follows the system theme by default. Toggling stores an override;
 * toggling back to the system theme clears it, so the page tracks the
 * system again.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const [override, setOverride] = useState<Theme | null>(readStored);
  const [system, setSystem] = useState<Theme>(systemTheme);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onChange = () => setSystem(media.matches ? 'dark' : 'light');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (override) root.dataset.theme = override;
    else delete root.dataset.theme;
  }, [override]);

  const theme = override ?? system;

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const nextOverride = next === system ? null : next;
    setOverride(nextOverride);
    writeStored(nextOverride);
  }, [theme, system]);

  return { theme, toggle };
}
