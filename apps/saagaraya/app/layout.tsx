import { ReactNode } from 'react';

import { BackgroundComponent } from '@/components/background';
import { Navbar } from '@/components/navbar';

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
      <body>
        <BackgroundComponent moreDarken={true} />
        <Providers>
          <div className="z-0 h-full overflow-y-auto">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
