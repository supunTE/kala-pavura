import cs from 'classnames';
import Image from 'next/image';

import { DisplayLanguage } from '@kala-pavura/models';

import { saagaraya_title_logo } from '@/assets/images/logo';
import { BackgroundComponent } from '@/components/background';
import { Navbar } from '@/components/navbar';
import { useFontStatic } from '@/modules/hooks';

export const metadata = {
  title: 'Saagaraya🌊 Home',
  description: 'Kala Pavura | The art gallery of Sri Lanka (Saagaraya)',
};

export default async function Index() {
  const { primaryFont } = useFontStatic(DisplayLanguage.Sinhala);

  return (
    <>
      <Navbar />
      <BackgroundComponent />
      <div
        className={cs(
          primaryFont.className,
          'flex h-full w-full flex-1 items-center justify-center',
        )}>
        <Image
          src={saagaraya_title_logo}
          width={500}
          height={300}
          alt="background"
          priority={true}
          className={cs('backdrop-filter')}
        />
      </div>
    </>
  );
}
