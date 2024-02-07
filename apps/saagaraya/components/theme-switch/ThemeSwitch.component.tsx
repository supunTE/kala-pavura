'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import {
  CaretLeft,
  CaretRight,
  Desktop,
  Moon,
  Sun,
} from '@phosphor-icons/react';
import cs from 'classnames';
import { useTheme } from 'next-themes';

const options = [
  { value: 'system', label: 'System', icon: Desktop },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
];

export const ThemeSwitchComponent = () => {
  const { theme, setTheme } = useTheme();
  const { setColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const syncMantineColorScheme = useCallback((theme?: string) => {
    if (!theme) return;

    if (theme === 'system') {
      setColorScheme('auto');
    } else if (theme === 'dark') {
      setColorScheme('dark');
    } else if (theme === 'light') {
      setColorScheme('light');
    }
  }, []);

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

  const selectedOption = options.find((option) => option.value === theme);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute right-0 flex flex-row-reverse z-20 p-2">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={cs(
            'p-2 border-2 border-neutral-200 dark:border-neutral-600 rounded-full bg-white dark:bg-neutral-800',
          )}>
          {isOpen ? (
            <CaretLeft size={14} weight="fill" />
          ) : selectedOption ? (
            <selectedOption.icon size={14} weight="fill" />
          ) : (
            <CaretRight size={14} weight="fill" />
          )}
        </div>

        <div
          className={cs(
            'absolute flex gap-2 p-1',
            {
              'right-12 opacity-1': isOpen,
              '-right-20 opacity-0': !isOpen,
            },
            'bg-neutral-200 dark:bg-neutral-700 rounded-lg shadow-lg',
            'overflow-hidden',
            'transition-all duration-300 ease-in-out',
          )}>
          {options.map((option) => (
            <div
              key={option.value}
              className={cs(
                'flex flex-col items-center justify-center',
                'cursor-pointer p-1 rounded-full',
                'hover:bg-neutral-300 dark:hover:bg-neutral-800',
                'transition-all duration-300 ease-in-out',
              )}
              onClick={() => {
                setTheme(option.value);
                setIsOpen(false);
              }}>
              <option.icon
                className="text-gray-600 dark:text-gray-200"
                size={16}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
