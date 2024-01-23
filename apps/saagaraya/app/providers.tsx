'use client';

import { ReactNode } from 'react';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { ThemeProvider } from 'next-themes';

import { noto_sans_sinhala } from '@/assets/fonts';
import { AuthContextProvider } from '@/modules/context';

type ProvidersProps = {
  children: ReactNode;
};

const theme = createTheme({
  fontFamily: noto_sans_sinhala.style.fontFamily,
});

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <AuthContextProvider>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
