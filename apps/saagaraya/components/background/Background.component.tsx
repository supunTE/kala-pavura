'use client';

import cs from 'classnames';
import Image from 'next/image';

import { ocean_background } from '@/assets/images/bg';

type BackgroundComponentProps = {
  enableDarkOverlay: boolean;
};

export function BackgroundComponent({
  enableDarkOverlay,
}: BackgroundComponentProps) {
  return (
    <div className="fixed inset-0 -z-20">
      <div
        className={cs('absolute inset-0 ', {
          'bg-zinc-900/60': !enableDarkOverlay,
          'bg-zinc-900/80 backdrop-blur-sm': enableDarkOverlay,
        })}
      />
      <Image
        src={ocean_background}
        fill={true}
        alt="background"
        priority={true}
        className="fixed -z-20"
      />
    </div>
  );
}
