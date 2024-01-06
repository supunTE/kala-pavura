import Image from 'next/image'
import bg_image from '../assets/images/background.jpg'
import saagaraya_wave_image from '../assets/images/saagaraya-logo.png'
import cs from 'classnames'
import {notoSerifSinhala} from "../assets/fonts/fonts";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';

const theme = createTheme({});

export default async function Index() {
  return (
    <MantineProvider theme={theme}>
      <div className={cs(notoSerifSinhala.className, 'h-full')}>
        <div className={cs('w-full h-full', 'flex justify-center items-center')}>
          <Image src={saagaraya_wave_image} width={500} height={300} alt='background' priority={true} className={cs('backdrop-filter backdrop-hue-rotate-15')}/>
        </div>
          {/* සාගරය */}

        <div className={cs('z-[-5] absolute', 'h-full w-full inset-0', 'bg-zinc-900/60')}/>
        <Image src={bg_image} fill={true} alt='background' priority={true} className={'-z-10'}/>
      </div>
    </MantineProvider>
  );
}
