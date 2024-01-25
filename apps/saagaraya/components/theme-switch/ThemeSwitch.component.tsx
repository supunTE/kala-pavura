'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { useTheme } from 'next-themes';

export const ThemeSwitchComponent = () => {
  const { setColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const syncMantineColorScheme = useCallback(
    (theme?: string) => {
      if (!theme) return;
    },
    [setColorScheme],
  );

  useEffect(() => {
    syncMantineColorScheme(theme);
  }, [syncMantineColorScheme, theme]);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    syncMantineColorScheme(theme);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
};
