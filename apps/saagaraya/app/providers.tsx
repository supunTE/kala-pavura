'use client';

import { ReactNode } from 'react';
import {
  ColorSchemeScript,
  createTheme,
  MantineProvider,
  rem,
} from '@mantine/core';
import { ThemeProvider } from 'next-themes';

import { noto_sans_sinhala } from '@/assets/fonts';
import { AuthContextProvider } from '@/modules/context';

type ProvidersProps = {
  children: ReactNode;
};

const theme = createTheme({
  fontFamily: noto_sans_sinhala.style.fontFamily,
  fontSizes: {
    xs: rem(2),
    sm: rem(1),
    md: rem(1),
    lg: rem(1),
    xl: rem(2),
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider attribute="class">
        <MantineProvider theme={theme}>
          <ColorSchemeScript defaultColorScheme="auto" />
          {children}
        </MantineProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
