import cs from 'classnames';
import Image from 'next/image';

import { ocean_background } from '@/assets/images/bg';

type BackgroundComponentProps = {
  moreDarken?: boolean;
};

const backgroundComponentDefaults = {
  moreDarken: false,
};

export function BackgroundComponent({
  moreDarken = false,
}: BackgroundComponentProps = backgroundComponentDefaults) {
  return (
    <>
      <div
        className={cs('z-[-5] absolute', 'h-full w-full inset-0', {
          'bg-zinc-900/60': !moreDarken,
          'bg-zinc-900/80 backdrop-blur-sm': moreDarken,
        })}
      />
      <Image
        src={ocean_background}
        fill={true}
        alt="background"
        priority={true}
        className={'-z-10'}
      />
    </>
  );
}
