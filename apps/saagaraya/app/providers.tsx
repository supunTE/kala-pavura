'use client';

import { ReactNode } from 'react';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
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
          <Notifications position="bottom-right" limit={5} />
          <ColorSchemeScript defaultColorScheme="auto" />
          {children}
        </MantineProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
