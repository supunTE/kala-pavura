'use client';

import Image from 'next/image';

import { ocean_background } from '@/assets/images/bg';

export function BackgroundComponent() {
  return (
    <div className="fixed inset-0 -z-20">
      <div className="absolute inset-0 bg-zinc-900/60" />
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
