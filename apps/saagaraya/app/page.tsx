import { createTheme, MantineProvider } from '@mantine/core';
import cs from 'classnames';
import Image from 'next/image';

import { DisplayLanguage } from '@kala-pavura/models';

import { noto_sans_sinhala } from '@/assets/fonts';
import { saagaraya_title_logo } from '@/assets/images';
import bg_image from '@/assets/images/background.jpg';
import { Navbar } from '@/components/navbar';
import { useFontStatic } from '@/modules/hooks';

import { Providers } from './providers';

import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: noto_sans_sinhala.style.fontFamily,
});

export default async function Index() {
  const { primaryFont } = useFontStatic(DisplayLanguage.Sinhala);

  return (
    <Providers>
      <MantineProvider theme={theme}>
        <div className={cs(primaryFont.className, 'h-full')}>
          <Navbar />
          <div
            className={cs('w-full h-full', 'flex justify-center items-center')}>
            <Image
              src={saagaraya_title_logo}
              width={500}
              height={300}
              alt="background"
              priority={true}
              className={cs('backdrop-filter')}
            />
          </div>
          <div
            className={cs(
              'z-[-5] absolute',
              'h-full w-full inset-0',
              'bg-zinc-900/60',
            )}
          />
          <Image
            src={bg_image}
            fill={true}
            alt="background"
            priority={true}
            className={'-z-10'}
          />
        </div>
      </MantineProvider>
    </Providers>
  );
}
