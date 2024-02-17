import cs from 'classnames';
import Image from 'next/image';

import { DisplayLanguage } from '@kala-pavura/models';

import { saagaraya_title_logo } from '@/assets/images';
import { BackgroundComponent } from '@/components/background';
import { useFontStatic } from '@/modules/hooks';

export default async function Index() {
  const { primaryFont } = useFontStatic(DisplayLanguage.Sinhala);

  return (
    <div className={cs(primaryFont.className)}>
      <div
        className={cs('h-screen w-full', 'flex items-center justify-center')}>
        <Image
          src={saagaraya_title_logo}
          width={500}
          height={300}
          alt="background"
          priority={true}
          className={cs('backdrop-filter')}
        />
      </div>
      <BackgroundComponent />
    </div>
  );
}
