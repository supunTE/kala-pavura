import React from 'react';
import cs from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { saagaraya_logo } from '@/assets/images';
import { MobileNavbar } from '@/components/navbar/MobileNavbar';
import { ThemeSwitchComponent } from '@/components/theme-switch';

import { NavbarControls } from './molecules';

export function Navbar() {
  return (
    <>
      <div
        className={cs(
          'z-40 hidden w-full items-start justify-center px-2 py-4 sm:flex sm:px-8',
          'sticky top-0',
        )}>
        <div className="group/navbar">
          <div className="flex h-16 items-start justify-center gap-2 sm:gap-6">
            <Link
              href="/"
              className={cs(
                'bg-zinc-700/40 backdrop-blur-md',
                'h-full flex-none p-3 sm:p-4',
                'rounded-full',
                'border border-zinc-400/20',
              )}>
              <Image
                src={saagaraya_logo}
                alt="logo"
                className={cs('h-full w-full', 'object-contain')}
              />
            </Link>

            <nav
              className={cs(
                'h-full w-full flex-1',
                'rounded-full px-4 py-3.5',
                'transition-all duration-300',
                'border border-zinc-400/20',
                'bg-zinc-700/40 backdrop-blur-md',
                'flex flex-col items-center justify-center gap-2',
              )}>
              <div className="flex items-center justify-center gap-4">
                <NavbarControls />
                <ThemeSwitchComponent />
              </div>
              <div
                className={cs(
                  'absolute inset-0 overflow-hidden',
                  'rounded-full',
                  'h-full w-full',
                )}>
                <div
                  className={cs(
                    'absolute inset-y-0 skew-x-12',
                    'bg-gray-400/50',
                    'h-full w-10',
                    'blur-lg',
                    'left-0',
                    'animate-move-right',
                  )}
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
      <MobileNavbar />
    </>
  );
}
