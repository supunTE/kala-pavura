'use client';

import { AuthContextProvider } from '@/modules/context';

type ProvidersProps = {
  children: React.ReactElement;
};

export function Providers({ children }: ProvidersProps) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
