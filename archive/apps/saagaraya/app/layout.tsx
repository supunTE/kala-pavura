import { ReactNode } from 'react';

import { Providers } from './providers';

import './global.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export const metadata = {
  title: 'Saagaraya🌊',
  description: 'Kala Pavura | The art gallery of Sri Lanka (Saagaraya)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Providers>
          <div className="flex min-h-full flex-col transition-all duration-300">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
