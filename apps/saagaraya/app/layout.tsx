import { ReactNode } from 'react';

import './global.css';

export const metadata = {
  title: 'Saagaraya🌊',
  description: 'Kala Pavura | The art gallery of Sri Lanka (Saagaraya)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
