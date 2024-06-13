'use client';

import { Button } from '@mantine/core';
import {
  CaretRight,
  GridFour,
  MagnifyingGlass,
  PencilSimple,
  User,
} from '@phosphor-icons/react';
import cs from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DisplayLanguage } from '@kala-pavura/models';

import { saagaraya_logo } from '@/assets/images';
import { AuthModalComponent } from '@/components/auth-modal';
import { useAuth } from '@/modules/context';
import { useFontStatic, useMouseClickOpen } from '@/modules/hooks';
import { LoggingButton } from '@/components/navbar/molecules/LoggingButton';

const navLinks = [
  {
    title: 'ලියන්න',
    href: '/write/story',
    icon: PencilSimple,
  },
  {
    title: 'කිමිදෙන්න',
    href: '/search',
    icon: MagnifyingGlass,
  },
  {
    title: 'පවුර',
    href: '/feed',
    icon: GridFour,
  },
  {
    title: 'පැතිකඩ',
    href: '/profile',
    icon: User,
  },
];

export function MobileNavLinks() {
  const { userLoggingState } = useAuth();
  const pathname = usePathname();
  const { primaryFont } = useFontStatic(DisplayLanguage.Sinhala);
  //
  // const {
  //   isOpened: isLoginClicked,
  //   clickableAreaRef: loginButton,
  //   insideContainerRef: authModalContainer,
  //   forceClose: forceCloseAuthModal,
  // } = useMouseClickOpen();

  return (
    <>
      <div className="flex h-12 w-full items-center justify-between">
        <Link
          href="/"
          className={cs(
            'bg-zinc-700/40 backdrop-blur-md',
            'aspect-square h-10 p-2',
            'rounded-full',
            'border border-zinc-400/20',
          )}>
          <Image
            src={saagaraya_logo}
            alt="logo"
            className={cs('h-full w-full', 'object-contain')}
          />
        </Link>
        <div
          className={cs(
            'flex items-center justify-end gap-2',
            'text-sm font-bold',
          )}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className={cs(
                  'hover:ring-curious-blue-400 flex items-center gap-1 rounded-full p-2 transition-all duration-300 hover:bg-gray-300/40 hover:text-zinc-100 hover:ring-1',
                  {
                    'bg-gray-300/20': pathname === link.href,
                    'bg-gray-300/10': pathname !== link.href,
                  },
                )}>
                <Icon className="h-6 w-6" />
                {pathname === link.href && (
                  <span className={cs('text-xs', primaryFont.className)}>
                    {link.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
