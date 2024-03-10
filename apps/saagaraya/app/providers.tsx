'use client';

import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { getPersistor } from '@rematch/persist';
import { ThemeProvider } from 'next-themes';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { noto_sans_sinhala } from '@/assets/fonts';
import { AuthContextProvider } from '@/modules/context';

import { store } from '../store';

type ProvidersProps = {
  children: ReactNode;
};

const theme = createTheme({
  fontFamily: noto_sans_sinhala.style.fontFamily,
});

const persistor = getPersistor();

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthContextProvider>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider attribute="class">
            <MantineProvider theme={theme}>
              <Notifications position="bottom-right" limit={5} />
              <ColorSchemeScript defaultColorScheme="auto" />
              {children}
            </MantineProvider>
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </AuthContextProvider>
  );
}
