import cs from 'classnames';

import { DisplayLanguage } from '@kala-pavura/models';

import { BackgroundComponent } from '@/components/background';
import { Navbar } from '@/components/navbar';
import { useFontStatic } from '@/modules/hooks';
import { LoggingButton } from '@/components/navbar/molecules/LoggingButton';
import { saagaraya_title_logo } from '@/assets/images';

import Image from 'next/image';

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
          'flex w-full flex-1 flex-col gap-4 items-center justify-center',
        )}>
       <Image
          src={saagaraya_title_logo}
          width={500}
          height={300}
          alt="background"
          priority={true}
          className={cs('-mt-16 backdrop-filter')}
        />
        <div className="sm:hidden">
        <LoggingButton/>

        </div>
      </div>
    </>
  );
}
