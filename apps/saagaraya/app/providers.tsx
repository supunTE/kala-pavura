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
    <AuthContextProvider>
      <ThemeProvider attribute="class">
        <MantineProvider theme={theme}>
          <div className="font-medium">
            <ColorSchemeScript defaultColorScheme="auto" />
            {children}
          </div>
        </MantineProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
