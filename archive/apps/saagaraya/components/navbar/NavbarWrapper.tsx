'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import cs from 'classnames';
import { usePathname } from 'next/navigation';

import { PATHS_TO_EXCLUDE_NAVBAR } from '../../constants';

type NavbarWrapperProps = {
  children: ReactNode;
};

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const isPathOnExcludeList = PATHS_TO_EXCLUDE_NAVBAR.includes(pathname);
    setIsNavHidden(isPathOnExcludeList);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (!navbarRef.current) {
        return setIsScrolled(false);
      }
      console.log(navbarRef.current.offsetHeight);

      const scrollY = window.scrollY;
      setIsScrolled(scrollY > navbarRef.current.offsetHeight);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (isNavHidden) return null;

  return (
    <div
      className={cs(
        'z-40 flex w-full items-start justify-center gap-6 px-8 py-4',
        'sticky top-0',
      )}>
      {children}
    </div>
  );
}
