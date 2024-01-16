import { DisplayLanguage } from '@kala-pavura/models';
import { createTheme, MantineProvider } from '@mantine/core';
import cs from 'classnames';
import Image from 'next/image';

import { notoSansSinhala } from '@/assets/fonts';
import bg_image from '@/assets/images/background.jpg';
import saagaraya_wave_image from '@/assets/images/saagaraya-logo.png';
import { useFontStatic } from '@/modules/hooks/useFontStatic';

import { Navbar } from '../components';

import { Providers } from './Providers';

import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: notoSansSinhala.style.fontFamily,
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
              src={saagaraya_wave_image}
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
