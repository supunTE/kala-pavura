import cs from 'classnames';
import Image from 'next/image';

import { saagaraya_logo } from '@/assets/images';

import { NavbarControls } from './molecules';

export function Navbar() {
  return (
    <div
      className={cs(
        'absolute inset-0 py-4 px-8',
        'flex items-start justify-center gap-6',
      )}>
      <div
        className={cs(
          'bg-zinc-700/40 backdrop-blur-md',
          'p-3',
          'rounded-full',
          'border border-zinc-400/20',
          'h-16',
        )}>
        <Image
          src={saagaraya_logo}
          alt="logo"
          className={cs('h-full w-min', 'object-contain')}
        />
      </div>

      <nav
        className={cs(
          'h-16 w-full',
          'px-4',
          'border border-zinc-400/20',
          'bg-zinc-700/40 backdrop-blur-md',
          'rounded-full',
          'flex items-center justify-end gap-6',
          'relative',
        )}>
        <NavbarControls />

        <div
          className={cs(
            'absolute overflow-hidden inset-0',
            'rounded-full',
            'w-full h-full',
          )}>
          <div
            className={cs(
              'absolute inset-y-0 skew-x-12',
              'bg-gray-400/50',
              'w-10 h-full',
              'blur-lg',
              'left-0',
              'animate-move-right',
            )}
          />
        </div>
      </nav>
    </div>
  );
}
