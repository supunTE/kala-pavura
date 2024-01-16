import { DisplayLanguage, LanguageFonts } from '@kala-pavura/models';
import {
  Noto_Sans_Sinhala,
  Noto_Serif_Sinhala,
  Poppins,
  Source_Serif_4,
} from 'next/font/google';

export const notoSerifSinhala = Noto_Serif_Sinhala({
  subsets: ['sinhala'],
  display: 'swap',
  weight: ['200', '400', '700'],
});

export const notoSansSinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  display: 'swap',
  weight: ['400', '600'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
});

export const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const languageFonts: LanguageFonts = {
  [DisplayLanguage.Sinhala]: {
    primaryFont: notoSansSinhala,
    secondaryFont: notoSerifSinhala,
  },
  [DisplayLanguage.English]: {
    primaryFont: poppins,
    secondaryFont: sourceSerif4,
  },
  [DisplayLanguage.Tamil]: {
    primaryFont: poppins,
    secondaryFont: sourceSerif4,
  },
};
