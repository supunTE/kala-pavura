import { ReactNode } from 'react';

import { Providers } from './providers';

import './global.css';
import '@mantine/core/styles.css';

export const metadata = {
  title: 'Saagaraya🌊',
  description: 'Kala Pavura | The art gallery of Sri Lanka (Saagaraya)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
