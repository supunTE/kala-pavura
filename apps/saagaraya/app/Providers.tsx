'use client';

import { AuthContextProvider } from '@/modules/context/AuthContext';

type ProvidersProps = {
  children: React.ReactElement;
};

export function Providers({ children }: ProvidersProps) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
