import cs from 'classnames';
import Image from 'next/image';

import { ocean_background } from '@/assets/images/bg';

export function BackgroundComponent() {
  return (
    <>
      <>
        <div
          className={cs(
            'z-[-5] absolute',
            'h-full w-full inset-0',
            'bg-zinc-900/60',
          )}
        />
        <Image
          src={ocean_background}
          fill={true}
          alt="background"
          priority={true}
          className={'-z-10'}
        />
      </>
    </>
  );
}
