'use client';

import { useEffect, useState } from 'react';
import cs from 'classnames';
import { usePathname } from 'next/navigation';

import { PATHS_TO_EXCLUDE_NAVBAR } from '../../constants';

type NavbarWrapperProps = {
  children: React.ReactNode;
};

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
  const [isNavHidden, setIsNavHidden] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const isPathOnExcludeList = PATHS_TO_EXCLUDE_NAVBAR.includes(pathname);
    setIsNavHidden(isPathOnExcludeList);
  }, []);

  if (isNavHidden) return null;

  return (
    <div
      className={cs(
        'absolute flex w-full items-start justify-center gap-6 px-8 py-4',
      )}>
      {children}
    </div>
  );
}
